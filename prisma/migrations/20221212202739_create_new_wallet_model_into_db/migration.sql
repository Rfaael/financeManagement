/*
  Warnings:

  - You are about to drop the column `description` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `payday` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `plannedValue` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `realValue` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Wallet` table. All the data in the column will be lost.
  - Added the required column `value` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "description",
DROP COLUMN "dueDate",
DROP COLUMN "payday",
DROP COLUMN "plannedValue",
DROP COLUMN "realValue",
DROP COLUMN "type",
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "value" INTEGER NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Movement" (
    "id" TEXT NOT NULL,
    "wallet_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "plannedValue" DOUBLE PRECISION,
    "realValue" DOUBLE PRECISION,
    "type" TEXT NOT NULL,
    "payday" TEXT,
    "dueDate" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movement_id_key" ON "Movement"("id");

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
