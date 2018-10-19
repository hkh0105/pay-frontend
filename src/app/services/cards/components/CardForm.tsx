import { Button, CheckBox } from '@ridi/rsg';
import * as classNames from 'classnames';
import detectIt from 'detect-it';
import { every } from 'lodash-es';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { SpaceKeyCode } from 'app/components';
import { history } from 'app/config';
import { publicUrls, urls } from 'app/routes';
import {
  cardCheckboxInputKey,
  CardFormState,
  CardInput,
  CardInputKey,
  CardInputProps,
  cardNumberInputAutoCompleteProps,
  cardNumberInputKey,
  cardNumberInputName,
  initialCardFormState,
  initialCardInputRefs,
} from 'app/services/cards/components';
import { agreementLinkClass, agreeToTermsCheckbox, cardFormSubmitButtonClass, cardFormSubmitDisabledButtonClass, cardInputBox60, cardInputBoxAgreeToTerms, cardInputBoxBorder, cardInputBoxBorderInteractive, cardInputBoxInline, cardInputBoxInlineGroup, cardInputBoxLabel, cardInputGroup, expDateDelimiter, innerInputJust } from 'app/services/cards/components/CardForm.styles';
import { UserActions } from 'app/services/user/userActions';
import { requestRegisterCard } from 'app/services/user/userRequests';
import { RegisterCardRequestPayload } from 'app/services/user/userTypes';
import { RootState } from 'app/store';
import { a11y } from 'app/styles';
import {
  cleanUpCardNumber,
  getCardTypeByNumber,
  prettifyCardNumber,
} from 'app/utils';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const isTouchDevice = detectIt.hasTouch;

function preventDefaultOnSpaceKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.keyCode === SpaceKeyCode) {
    e.preventDefault();
  }
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
interface State extends CardFormState {
  isFetching: boolean;
}

export class CardForm extends React.Component<Props, State> {
  public state: State = {
    ...initialCardFormState,
    isFetching: false,
  };
  public inputRefs = initialCardInputRefs;

  private getHandleChangeNumberInput = (inputKey: string) => {
    return (event: React.SyntheticEvent<HTMLInputElement>) => {
      const newInputs = { ...this.state.numberInputs };

      newInputs[inputKey].value = event.currentTarget.value;
      newInputs[inputKey].isValid = newInputs[inputKey].regexp.test(event.currentTarget.value);

      this.setState({
        numberInputs: newInputs,
      });
    };
  }

  private handleChangeCardNumberInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const inputKey = cardNumberInputKey.cardnumber;
    const newInputs = { ...this.state.numberInputs };

    const cardNumber = cleanUpCardNumber(event.currentTarget.value);
    const cardType = getCardTypeByNumber(cardNumber);

    newInputs[inputKey].value = prettifyCardNumber(cardNumber, cardType);
    newInputs[inputKey].regexp = cardType.pattern;
    newInputs[inputKey].isValid = cardType.pattern.test(cardNumber);
    newInputs[inputKey].maxLength = cardType.maxLength + cardType.gap.length;

    this.setState({
      numberInputs: newInputs,
    });
  }

  private getHandleChangeCheckbox = (inputKey: string) => {
    return (event: React.SyntheticEvent<HTMLInputElement>) => {
      const newInputs = { ...this.state.checkboxInputs };

      newInputs[inputKey].checked = event.currentTarget.checked;
      newInputs[inputKey].isValid = event.currentTarget.checked;

      this.setState({
        checkboxInputs: newInputs,
      });
    };
  }

  private getInputRef = (inputKey: string) => {
    return this.inputRefs[inputKey];
  }

  private getDeleteLastChar = (inputKey: string) => {
    return () => {
      this.setState((prevState: CardFormState) => ({
        numberInputs: {
          ...prevState.numberInputs,
          [inputKey]: {
            ...prevState.numberInputs[inputKey],
            value: prevState.numberInputs[inputKey].value.slice(0, -1),
          },
        },
      }));
    };
  }

  private isFormValid = () => {
    return every(this.state.numberInputs, ((input) => input.isValid)) &&
      every(this.state.checkboxInputs, ((input) => input.isValid));
  }

  private renderCardInput = ({
    currentInputKey,
    prevInputKey,
    nextInputKey,
    onChange,
    formatValue = (value) => value,
    className,
    placeholder,
    extraProps,
  }: {
    currentInputKey: CardInputKey;
    prevInputKey?: CardInputKey;
    nextInputKey?: CardInputKey;
    onChange?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
    formatValue?: (value: string) => string;
    className?: string;
    placeholder?: string;
    extraProps?: Partial<CardInputProps>;
  }) => {
    const { numberInputs } = this.state;
    return (
      <CardInput
        id={currentInputKey}
        name={cardNumberInputName[currentInputKey]}
        autoComplete={cardNumberInputAutoCompleteProps[currentInputKey]}
        className={className}
        value={formatValue(numberInputs[currentInputKey].value)}
        onChange={onChange || this.getHandleChangeNumberInput(currentInputKey)}
        refObject={this.getInputRef(currentInputKey)}
        prevInputRef={prevInputKey ? this.getInputRef(prevInputKey) : undefined}
        nextInputRef={nextInputKey ? this.getInputRef(nextInputKey) : undefined}
        deletePrevInputLastChar={prevInputKey ? this.getDeleteLastChar(prevInputKey) : undefined}
        maxLength={numberInputs[currentInputKey].maxLength}
        pattern={numberInputs[currentInputKey].regexp.toString()}
        placeholder={placeholder}
        required={true}
        {...extraProps}
      />
    );
  }

  private handleSubmitButtonClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (this.state.isFetching || !this.isFormValid()) {
      return;
    }
    const { numberInputs } = this.state;
    const { ccmonth, ccyear, cardnumber, password, birthdate } = cardNumberInputKey;
    const expirationDate = `${numberInputs[ccyear].value}${numberInputs[ccmonth].value}`
    this.setState({ isFetching: true })

    try {
      await requestRegisterCard({
        card_expiration_date: expirationDate,
        card_number: numberInputs[cardnumber].value.replace(/\s/g, ''),
        card_password: numberInputs[password].value,
        tax_id: numberInputs[birthdate].value,
      });
      history.replace(urls.REGISTER_PIN);
    } catch (e) {
      alert(e.data.message);
      this.setState({ isFetching: false });
    }
  }

  public componentDidMount() {
    if (this.props.cardExists) {
      history.replace(urls.SETTINGS);
      return;
    }
    if (!isTouchDevice) {
      // autofocus 속성을 사용하거나 requestAnimationFrame 사용 시
      // 포커스 outline 스타일이 보였다 사라지므로 setTimeout으로 처리
      window.setTimeout(() => {
        this.inputRefs[cardNumberInputKey.cardnumber].current.focus();
      }, 500);
    }
  }

  public render() {
    const { checkboxInputs } = this.state;

    return (
      <form
        id="RegisterCreditCard_Form"
        className="RegisterCreditCard_Form"
      >
        <div className={cardInputGroup}>
          <div className={cardInputBox60}>
            <label htmlFor={cardNumberInputKey.cardnumber} className={cardInputBoxLabel}>
              카드 번호
            </label>
            {this.renderCardInput({
              currentInputKey: cardNumberInputKey.cardnumber,
              nextInputKey: cardNumberInputKey.ccmonth,
              onChange: this.handleChangeCardNumberInput,
              placeholder: `‘-’ 없이 입력`,
              extraProps: {
                allowSpace: true,
                onKeyDown: preventDefaultOnSpaceKeyEvent,
              },
            })}
            <div className={cardInputBoxBorderInteractive} />
          </div>
          <div className={cardInputBoxInlineGroup}>
            <div
              id="ccexp"
              className={cardInputBoxInline}
            >
              <p className={cardInputBoxLabel}>유효 기간</p>
              {this.renderCardInput({
                currentInputKey: cardNumberInputKey.ccmonth,
                prevInputKey: cardNumberInputKey.cardnumber,
                nextInputKey: cardNumberInputKey.ccyear,
                placeholder: 'MM',
                className: innerInputJust,
              })}
              <label htmlFor={cardNumberInputKey.ccmonth} className={a11y}>
                만료 월
              </label>
              <span className={expDateDelimiter}>/</span>
              {this.renderCardInput({
                currentInputKey: cardNumberInputKey.ccyear,
                prevInputKey: cardNumberInputKey.ccmonth,
                nextInputKey: cardNumberInputKey.password,
                placeholder: 'YY',
                className: innerInputJust,
              })}
              <label htmlFor={cardNumberInputKey.ccyear} className={a11y}>
                만료 연도
              </label>
              <div className={cardInputBoxBorderInteractive} />
            </div>
            {/*
              [name="new-password"] for preventing wrong autofill in password field
              doesn't seem to work from 1 day after implementing, not sure why
              next line which is working for now  either could not work after few days. -_-;
              referenced from: https://stackoverflow.com/questions/47775041/disable-autofill-in-chrome-63
            */}
            <input style={{ display: 'none' }}/>
            <div className={cardInputBoxInline}>
              <label htmlFor={cardNumberInputKey.password} className={cardInputBoxLabel}>
                카드 비밀번호
              </label>
              {this.renderCardInput({
                currentInputKey: cardNumberInputKey.password,
                prevInputKey: cardNumberInputKey.ccyear,
                nextInputKey: cardNumberInputKey.birthdate,
                placeholder: '앞 2자리',
                extraProps: {
                  isObscured: true,
                  // Workaround to prevent wrong autofill action since `autoComplete="off"`doesn't work in Chrome
                  // (https://stackoverflow.com/questions/50661767/prevent-chrome-autosuggest-list)
                  // It's against semantic however no other workaround seems to work and voice over works
                  // since this removes only meaning, not content, so..¯\_(ツ)_/¯
                  role: 'presentation',
                },
              })}
              <div className={cardInputBoxBorderInteractive} />
            </div>
          </div>
          <div className={cardInputBox60}>
            <label htmlFor={cardNumberInputKey.birthdate} className={cardInputBoxLabel}>생년월일</label>
            {this.renderCardInput({
              currentInputKey: cardNumberInputKey.birthdate,
              prevInputKey: cardNumberInputKey.password,
              placeholder: '6자리 입력 (예: 840331)',
            })}
            <div className={cardInputBoxBorderInteractive} />
          </div>
        </div>
        <div className={cardInputGroup}>
          <div className={cardInputBoxAgreeToTerms}>
            <CheckBox
              className={agreeToTermsCheckbox}
              checked={!!checkboxInputs[cardCheckboxInputKey.agreeToTerms].checked}
              onChange={this.getHandleChangeCheckbox(cardCheckboxInputKey.agreeToTerms)}
            >
              리디페이 이용약관 동의
            </CheckBox>
            <div className={cardInputBoxBorder} />
            <Link className={agreementLinkClass} to="/legal/terms">
              약관 보기
            </Link>
          </div>
        </div>
        <Button
          className={classNames(cardFormSubmitButtonClass, { [cardFormSubmitDisabledButtonClass]: !this.isFormValid() })}
          onClick={this.handleSubmitButtonClick}
          disabled={!this.isFormValid()}
          spinner={this.state.isFetching}
          color="blue"
        >
          카드 등록
        </Button>
      </form>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    cardExists: state.user.cards.length > 0,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // dispatchRequestRegisterCard: (payload: RegisterCardRequestPayload) => dispatch(UserActions.registerCardRequest(payload))
  }
}

export const ConnectedCardForm = connect(mapStateToProps, mapDispatchToProps)(CardForm);