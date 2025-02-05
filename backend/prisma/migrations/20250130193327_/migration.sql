-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateIndex
CREATE INDEX "Product_name_brand_idx" ON "Product"("name", "brand");
