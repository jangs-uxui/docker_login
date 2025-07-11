FROM mysql:8.0

# 비어있을때만 실행 (맨처음)
COPY ./shop_authentbl2.sql /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD=1234
ENV MYSQL_DATABASE=shop