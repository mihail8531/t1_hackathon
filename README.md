# Репозиторий команды angry_beavers | T1 хакатон 


## как запустить в используя docker:

Требуется docker compose >= 2.20.3

Ensure vm.max_map_count >= 262144:

To check the value of vm.max_map_count:

```
sysctl vm.max_map_count
```

Reset vm.max_map_count to a value at least 262144 if it is not.

# In this case, we set it to 262144:

```
$ sudo sysctl -w vm.max_map_count=262144
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





