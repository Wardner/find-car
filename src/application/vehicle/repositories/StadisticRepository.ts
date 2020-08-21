import { EntityRepository, Repository } from 'typeorm';
import { Stadistic } from '../../../database/entities/Stadistics';

@EntityRepository(Stadistic)
export class StadisticRepository extends Repository<Stadistic> {

  dataCountBrand = async () => {
    let data = this.manager.getRepository(Stadistic)
    .createQueryBuilder('s')
    .select('s.brand as x, COUNT(s.brandid)', 'y')
    .groupBy('s.brand')
    .execute()

    return data;
  }

  dataCountSector = async () => {
    let data = this.manager.getRepository(Stadistic)
    .createQueryBuilder('s')
    .select('s.sector as x, COUNT(s.sectorid)', 'y')
    .groupBy('s.sector')
    .execute()

    return data;
  }


}