module.exports = class AddProvinceToUser1678214246281 {
  name = 'AddProvinceToUser1678214246281';

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "users" ADD "province" character varying(50) NOT NULL`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "province"`);
  }
};
