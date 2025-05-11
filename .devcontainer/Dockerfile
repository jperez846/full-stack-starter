FROM mcr.microsoft.com/devcontainers/javascript-node

# Set up PostgreSQL APT repository and key
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    gnupg \
    lsb-release \
    ca-certificates \
 && mkdir -p /usr/share/keyrings \
 && wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc \
 | gpg --dearmor -o /usr/share/keyrings/postgresql.gpg \
 && echo "deb [signed-by=/usr/share/keyrings/postgresql.gpg] http://apt.postgresql.org/pub/repos/apt \
$(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list

# Install PostgreSQL client, classic HTTPie, and clean up APT
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client-16 \
    httpie \
 && rm -rf /var/lib/apt/lists/*

# Upgrade npm globally
RUN npm i -g npm

WORKDIR /workspaces
