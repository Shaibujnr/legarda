prepare-server:
	cd src/server && \
	pip install poetry && \
	poetry install -v && \
	poetry develop && \
	python manage.py db upgrade

server:
	cd src/server && \
	python manage.py run

test-server:
	cd src/server && pytest