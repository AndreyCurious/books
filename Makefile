start-frontend:
	make -C client start

start-backend:
	make -C server start

start:
	make start-backend & make start-frontend