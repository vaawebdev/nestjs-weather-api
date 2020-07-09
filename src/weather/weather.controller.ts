import { Controller, Get, Param } from '@nestjs/common';
import { MongoService } from './services/mongo/mongo.service';
import { OpenweatherService } from './services/openweather/openweather.service';
import { CityNotFoundHttpException } from './exceptions/CityNotFoundHttpException';

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly mongo: MongoService,
    private readonly openweather: OpenweatherService,
  ) {}

  @Get(':city')
  public async cityWeather(@Param('city') cityName: string): Promise<any> {
    const mongoRes = await this.mongo.getCityWeather(cityName);

    if (mongoRes && mongoRes.expirationDate.getTime() >= new Date().getTime()) {
      return mongoRes;
    }
    try {
      const openweatherRes = await this.openweather.fetchCityWeather(cityName);
      return await this.mongo.saveCityWeather(openweatherRes.data);
    } catch (error) {
      if (error?.response.status === 404) {
        throw new CityNotFoundHttpException(cityName);
      }
      console.error(error);
      return { statusCode: 500, error: error.message };
    }
  }
}
