#!/bin/sh
# Профиль Chromium лежит в Docker-volume и переживает пересоздание контейнера.
# Chromium оставляет в нём lock-файлы с hostname старого контейнера и при следующем
# старте отказывается открывать профиль ("profile appears to be in use ... on another computer").
# Контейнер всегда один на профиль, поэтому lock-файлы безопасно удалять перед запуском.
rm -f /home/neko/.config/chromium/SingletonLock \
      /home/neko/.config/chromium/SingletonSocket \
      /home/neko/.config/chromium/SingletonCookie
exec /usr/bin/chromium "$@"
