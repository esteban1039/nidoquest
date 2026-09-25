FROM node:22.18.0-bookworm

WORKDIR /app

EXPOSE 3000

# La instalación de dependencias se hace al arrancar (ver compose command),
# así el volumen ./frontend:/app siempre queda sincronizado con tu código.
CMD ["sh", "-c", "npm install --no-audit --no-fund && npm run dev -- --host 0.0.0.0 --port 3000"]
