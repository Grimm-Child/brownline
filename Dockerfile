# Use an official Python runtime as a parent image
FROM python:3.8
LABEL maintainer="hello@brownline.io"

# Set environment varibles
ENV PYTHONUNBUFFERED 1
ENV DJANGO_ENV dev

# Install packages needed to run your application (not build deps):
# We need to recreate the /usr/share/man/man{1..8} directories first because
# they were clobbered by a parent image.
RUN set -ex \
    && RUN_DEPS=" \
        libexpat1 \
        libjpeg62-turbo \
        libpcre3 \
        libpq5 \
        mime-support \
        postgresql-client \
        procps \
        zlib1g \
    " \
    && seq 1 8 | xargs -I{} mkdir -p /usr/share/man/man{} \
    && apt-get update && apt-get install -y --no-install-recommends $RUN_DEPS \
    && rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt /code/requirements.txt
RUN set -ex \
    && BUILD_DEPS=" \
        build-essential \
        git \
        libexpat1-dev \
        libjpeg62-turbo-dev \
        libpcre3-dev \
        libpq-dev \
        zlib1g-dev \
    " \
    && apt-get update && apt-get install -y --no-install-recommends $BUILD_DEPS \
    && python3.8 -m venv /.venv \
    && /.venv/bin/pip install --upgrade pip \
    && /.venv/bin/pip install --no-cache-dir -r /code/requirements.txt \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false $BUILD_DEPS \
    && rm -rf /var/lib/apt/lists/* \
    && pip install gunicorn

# Copy the current directory contents into the container at /code/
COPY . /code/
# Set the working directory to /code/
WORKDIR /code/

RUN python3.8 manage.py migrate

RUN useradd wagtail
RUN chown -R wagtail /code
USER wagtail

EXPOSE 8000

# Add custom environment variables needed by Django or your settings file here:
ENV DJANGO_SETTINGS_MODULE=brownline.settings.dev DJANGO_DEBUG=on

# Tell uWSGI where to find your wsgi file:
ENV UWSGI_WSGI_FILE=brownline/wsgi.py

# Base uWSGI configuration (you shouldn't need to change these):
ENV UWSGI_VIRTUALENV=/.venv UWSGI_HTTP=:8000 UWSGI_MASTER=1 UWSGI_HTTP_AUTO_CHUNKED=1 UWSGI_HTTP_KEEPALIVE=1 UWSGI_UID=1000 UWSGI_GID=2000 UWSGI_LAZY_APPS=1 UWSGI_WSGI_ENV_BEHAVIOR=holy

# Number of uWSGI workers and threads per worker (customize as needed):
ENV UWSGI_WORKERS=2 UWSGI_THREADS=4

# uWSGI uploaded media file serving configuration:
ENV UWSGI_STATIC_MAP="/media/=/code/brownline/media/"

# Call collectstatic with dummy environment variables:
RUN DATABASE_URL=postgres://none REDIS_URL=none /.venv/bin/python3.8 manage.py collectstatic --noinput

# make sure static files are writable by uWSGI process
RUN mkdir -p /code/brownline/media/images && chown -R 1000:2000 /code/brownline/media

# mark the destination for images as a volume
VOLUME ["/code/brownline/media/images/"]

# start uWSGI, using a wrapper script to allow us to easily add more commands to container startup:
ENTRYPOINT ["/code/docker-entrypoint.sh"]

# Start uWSGI
CMD ["/.venv/bin/uwsgi", "--show-config"]
#CMD exec gunicorn brownline.wsgi:application --bind 0.0.0.0:8000 --workers 3