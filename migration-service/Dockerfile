# Use an official Maven image with JDK 17
FROM maven:3.8.6-eclipse-temurin-17

# Set the working directory inside the container
WORKDIR /app

# Copy the project files into the container
COPY . .

# Run Spring Boot using Maven
CMD ["mvn", "spring-boot:run"]