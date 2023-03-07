module.exports = class AddRegionToUser1678214246281 {
  name = 'AddRegionToUser1678214246281';

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "users" ADD "region" character varying(50) NOT NULL`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "region"`);
  }
};
