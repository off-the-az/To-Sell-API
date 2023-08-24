import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipeBuilder,
  HttpStatus,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/users-role/decorators/users-role.decorator';
import { Role } from 'src/users-role/constants/users-role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileManagerService } from 'src/file-manager/file-manager.service';
import { ProductsPhotoListService } from 'src/products-photo-list/products-photo-list.service';

@UseGuards(AuthGuard)
@Controller('api/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly fileManagerService: FileManagerService,
    private readonly productsPhotoListService: ProductsPhotoListService,
  ) {}

  @Roles(Role.Seller, Role.Admin)
  @Post()
  @UseInterceptors(FilesInterceptor('files', 5))
  create(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        .addMaxSizeValidator({
          maxSize: 4096000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Array<Express.Multer.File>,
    @Body() createProductDto: CreateProductDto,
  ) {
    files.forEach(async (file) => {
      await this.productsPhotoListService.create({
        productId: createProductDto.id,
        photo: await this.fileManagerService.create(
          file,
          'products/' + createProductDto.id,
        ),
      });
    });
    return this.productsService.create(createProductDto);
  }
  @Roles(Role.User, Role.Seller)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneById(+id);
  }
  @Get('byCategory/:id')
  async findOneBycategory(@Param('id') id: string) {
    const products = await this.productsService.findOneByCategoriesId(+id);
    return products.map((product) => product.productId);
  }
  @Roles(Role.Seller)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }
  @Roles(Role.Seller)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
