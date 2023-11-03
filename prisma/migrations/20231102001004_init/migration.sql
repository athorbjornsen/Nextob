-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "info" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");
