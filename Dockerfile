# Use a imagem oficial do Nginx
FROM nginx:alpine

# Copie os arquivos do projeto para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Exponha a porta 80 para acessar o servidor
EXPOSE 80
