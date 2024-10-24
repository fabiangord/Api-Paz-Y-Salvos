-- CreateTable
CREATE TABLE `Rol` (
    `id` VARCHAR(191) NOT NULL,
    `rol` ENUM('USER', 'AREA_MANAGER', 'ADMIN') NOT NULL,

    UNIQUE INDEX `Rol_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentType` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('C.C.', 'C.E', 'T.I', 'P.E') NOT NULL,

    UNIQUE INDEX `DocumentType_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Credentials` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Credentials_id_key`(`id`),
    UNIQUE INDEX `Credentials_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RH` (
    `id` VARCHAR(191) NOT NULL,
    `RH` ENUM('O_PLUS', 'O_MINUS', 'A_PLUS', 'A_MINUS', 'B_PLUS', 'B_MINUS', 'AB_MINUS', 'AB_PLUS') NOT NULL,

    UNIQUE INDEX `RH_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gender` (
    `id` VARCHAR(191) NOT NULL,
    `genero` ENUM('MASCULINO', 'FEMENINO', 'OTRO') NOT NULL,

    UNIQUE INDEX `Gender_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Site` (
    `id` VARCHAR(191) NOT NULL,
    `site` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Site_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Function` (
    `id` VARCHAR(191) NOT NULL,
    `function` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Function_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contract` (
    `id` VARCHAR(191) NOT NULL,
    `no_contract` VARCHAR(191) NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `contratista` VARCHAR(191) NOT NULL,
    `valor_contrato` INTEGER NOT NULL,
    `causal_terminacion_contrato` VARCHAR(191) NOT NULL,
    `id_contrato` VARCHAR(191) NULL,

    UNIQUE INDEX `Contract_id_key`(`id`),
    UNIQUE INDEX `Contract_no_contract_key`(`no_contract`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RequestModel` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `typeRequest` ENUM('PAZ_Y_SALVO') NOT NULL,
    `status` ENUM('RECHAZADO', 'PENDIENTE', 'APROBADO') NOT NULL,
    `contractId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RequestModel_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `validation` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('RECHAZADO', 'PENDIENTE', 'APROBADO') NOT NULL,
    `commentary` VARCHAR(191) NOT NULL,
    `areaManagerId` VARCHAR(191) NOT NULL,
    `requestId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `validation_areaManagerId_requestId_key`(`areaManagerId`, `requestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `tipo_de_documento` VARCHAR(191) NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `rolId` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `ciudad` VARCHAR(191) NOT NULL,
    `rh` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `Centro_de_formacion` VARCHAR(191) NOT NULL,
    `Funcion_encargada` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_document_key`(`document`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Credentials` ADD CONSTRAINT `Credentials_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_id_contrato_fkey` FOREIGN KEY (`id_contrato`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RequestModel` ADD CONSTRAINT `RequestModel_contractId_fkey` FOREIGN KEY (`contractId`) REFERENCES `Contract`(`no_contract`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RequestModel` ADD CONSTRAINT `RequestModel_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `validation` ADD CONSTRAINT `validation_areaManagerId_fkey` FOREIGN KEY (`areaManagerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `validation` ADD CONSTRAINT `validation_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `RequestModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_tipo_de_documento_fkey` FOREIGN KEY (`tipo_de_documento`) REFERENCES `DocumentType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_rh_fkey` FOREIGN KEY (`rh`) REFERENCES `RH`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_genero_fkey` FOREIGN KEY (`genero`) REFERENCES `Gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_Centro_de_formacion_fkey` FOREIGN KEY (`Centro_de_formacion`) REFERENCES `Site`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_Funcion_encargada_fkey` FOREIGN KEY (`Funcion_encargada`) REFERENCES `Function`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
