module.exports = class AddOptionalProvinceToUsers1678289741467 {
  name = 'AddOptionalProvinceToUsers1678289741467';

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "users" ADD "province" character varying(50)`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "province"`);
  }
};
