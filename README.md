# TrainérDex Discord Bot

TrainérDex is a Discord bot designed for Pokémon go. It enables users to store, retrieve, and manage trainer IDs and other related metadata within a Discord server, enhancing the community's connectivity and engagement.

## Features

- **Trainer Profiles**: Users can create and manage their trainer profiles, including Pokémon GO friend codes, current trade offerings, Pokémon the trainer is searching for ect
- **Search Functionality**: Easily find other trainers based on specific criteria, fostering community interaction and engagement.
- **Matchmaking and Trading**: The bot facilitates in-game matchmaking, raid groups, and trading sessions by allowing users to better connect to each other by quickly adding and retrieving friend codes.

## Getting Started

To get started with TrainérDex, follow these steps:

### Prerequisites

- A Discord account and access to a server where you have permission to add bots.
- Node.js and npm installed on your system if you're hosting the bot yourself.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/symphon-y/trainerdex.git
   ```

2. **Install dependencies**:

   ```bash
   cd trainerdex
   npm install
   ```

3. **Set up your `.env` file** with the necessary Discord bot token and database credentials: **[an example can be found in .env.example]**

4. **Run the bot**:

   ```bash
   node index.js
   ```

## Docker Setup

To start the development environment using `docker-compose`, run:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

This command starts all services defined in the `docker-compose.yml` file and `docker-compose.dev.yml` file in detached mode.

For the development environment, ngrok is utilized to create a temporary HTTPS endpoint for TrainerDex, facilitating rapid testing and iteration without the need for permanent infrastructure changes. This approach allows developers to expose their local development server to the internet securely and conveniently.

To start the production environment using `docker-compose`, run:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

This command starts all services defined in the `docker-compose.yml` file and `docker-compose.prod.yml` file in detached mode.

The production environment leverages nginx as a reverse proxy, with LetsEncrypt providing SSL certification. This setup ensures a stable and secure HTTPS endpoint for TrainerDex, suitable for long-term deployment and public access. This distinction ensures that while development remains flexible and accessible, the production setup is optimized for security and performance.

## Updating the Bot

To update your bot running in a Docker container, you'll need to rebuild the Docker image and restart the container. This can be done by repeating the build and run steps, or by using docker-compose commands if applicable.

---

## Usage

After inviting TrainérDex to your Discord server, you can interact with it using specific commands. Here are a few examples:

- `[this section will be updated with appropriate commands as development progresses]`

For a full list of commands, use `[to be added]`.

## Contributing

Contributions are welcome! If you have suggestions for new features or improvements, feel free to create an issue or pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Travis Redden - [Linkedin](https://www.linkedin.com/in/travisredden/)

Project Link - [Github](https://github.com/Symphon-y/trainerdex)
