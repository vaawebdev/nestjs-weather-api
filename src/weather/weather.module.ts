import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CityWeather,
  CityWeatherSchema,
} from './services/mongo/schemas/city-weather.schema';
import { ConfigModule } from '@nestjs/config';
import { MongoService } from './services/mongo/mongo.service';
import { OpenweatherService } from './services/openweather/openweather.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: CityWeather.name,
        schema: CityWeatherSchema,
      },
    ]),
  ],
  controllers: [WeatherController],
  providers: [MongoService, OpenweatherService],
})
export class WeatherModule {}
