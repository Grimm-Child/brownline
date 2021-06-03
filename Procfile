#web: gunicorn brownline.wsgi
release: yes "yes" | python manage.py migrate
web: uwsgi --http-socket=:$PORT --master --workers=2 --threads=8 --die-on-term --wsgi-file=brownline/wsgi.py  --static-map /media/=/app/brownline/media/ --offload-threads 1