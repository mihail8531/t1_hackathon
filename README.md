# Репозиторий команды angry_beavers | T1 хакатон 

Трек окно знаний

## Kак запустить в используя docker:

Требуется docker compose >= 2.20.3

Убедитесь что vm.max_map_count >= 262144:

Установите vm.max_map_count не менее 262144:

```
sudo sysctl -w vm.max_map_count=262144
```

Склонируйте репозиторий:

```
git clone git@github.com:mihail8531/t1_hackathon.git angry_beavers
```

```
cd angry_beavers/docker
```

```
cp .env.example .env
```

```
docker compose up --build -d
```

Админ панель будет доступна по адресу http://127.0.0.1:8334

Пример интеграции окна чата будет доступен по адресу http://127.0.0.1:8333
