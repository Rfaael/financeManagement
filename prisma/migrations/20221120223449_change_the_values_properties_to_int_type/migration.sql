/*
  Warnings:

  - The `plannedValue` column on the `Wallet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `realValue` column on the `Wallet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "plannedValue",
ADD COLUMN     "plannedValue" INTEGER,
DROP COLUMN "realValue",
ADD COLUMN     "realValue" INTEGER;
