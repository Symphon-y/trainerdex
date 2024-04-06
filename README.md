
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

TrainérDex can also be run inside a Docker container, which simplifies the setup and ensures consistent running conditions regardless of the host environment.

### Building the Docker Image

1. Navigate to the project directory where the `Dockerfile` is located.

2. Build the Docker image with the following command:

   ```bash
   docker build -t trainerdex .
   ```

   This command builds a Docker image named `trainerdex` based on the instructions in your `Dockerfile`.

### Running the Bot in a Docker Container

After building the image, you can run TrainérDex in a Docker container:

```bash
docker run --name trainerdex_bot -d trainerdex
```

This command runs the `trainerdex` image in a detached mode (`-d`) with the container name `trainerdex_bot`.

### Using docker-compose

To start the bot using `docker-compose`, run:

```bash
docker-compose up -d
```

This command starts all services defined in your `docker-compose.yml` file in detached mode.

## Updating the Bot

To update your bot running in a Docker container, you'll need to rebuild the Docker image and restart the container. This can be done by repeating the build and run steps, or by using docker-compose commands if applicable.

-------

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