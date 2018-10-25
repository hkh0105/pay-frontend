include .env

deploy:
	aws s3 cp ./dist s3://$(BUCKET_NAME)/ \
	--cache-control immutable,max-age=100000000,public \
	--recursive \
	--exclude index.html
	aws s3 cp ./dist/index.html s3://$(BUCKET_NAME)/ \
	--cache-control immutable,max-age=0,public

cert:
	mkdir -p .ssl && cd .ssl && mkcert ${RIDI_PAY_HOST}
