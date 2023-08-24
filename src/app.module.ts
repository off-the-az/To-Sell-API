import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UsersRoleModule } from './users-role/users-role.module';
import * as dotenv from 'dotenv';
import { UsersRole } from './users-role/entities/users-role.entity';
import { NewsModule } from './news/news.module';
import { News } from './news/entities/news.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './users-role/guards/userrs-role.guard';
import { MaillerModule } from './mailer/mailer.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { AttributeModule } from './attribute/attribute.module';
import { Attribute } from './attribute/entities/attribute.entity';
import { AttributesValueModule } from './attributes-value/attributes-value.module';
import { AttributesValue } from './attributes-value/entities/attributes-value.entity';
import { CategoriesAttributeModule } from './categories-attribute/categories-attribute.module';
import { CategoriesAttribute } from './categories-attribute/entities/categories-attribute.entity';
import { TicketsProductListModule } from './tickets-product-list/tickets-product-list.module';
import { ProductsCategoryModule } from './products-category/products-category.module';
import { ProductsPhotoListModule } from './products-photo-list/products-photo-list.module';
import { ProductsModule } from './products/products.module';
import { ShopsModule } from './shops/shops.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { TicketModule } from './ticket/ticket.module';
import { CartModule } from './cart/cart.module';
import { ReviewsModule } from './reviews/reviews.module';
import { Shop } from "./shops/entities/shop.entity";
import { Product } from './products/entities/product.entity';
import { ProductsCategory } from './products-category/entities/products-category.entity';
import { ProductsPhotoList } from './products-photo-list/entities/products-photo-list.entity';
import { Review } from './reviews/entities/review.entity';
import { OrderStatus } from './order-status/entities/order-status.entity';
import { Ticket } from './ticket/entities/ticket.entity';
import { TicketsProductList } from './tickets-product-list/entities/tickets-product-list.entity';
import { Cart } from './cart/entities/cart.entity';
import { MulterModule } from '@nestjs/platform-express';
import { FileManagerModule } from './file-manager/file-manager.module';
dotenv.config({ path: __dirname + '/../.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, UsersRole, News, Category, Attribute, AttributesValue, CategoriesAttribute, Shop, Product, ProductsCategory, ProductsPhotoList, Review, OrderStatus, Ticket, TicketsProductList, Cart],
      synchronize: true,
    }),
    UserModule,
    UsersRoleModule,
    AuthModule,
    NewsModule,
    MaillerModule,
    CategoryModule,
    AttributeModule,
    AttributesValueModule,
    CategoriesAttributeModule,
    TicketModule,
    CartModule,
    ReviewsModule,
    OrderStatusModule,
    ShopsModule,
    ProductsModule,
    ProductsPhotoListModule,
    ProductsCategoryModule,
    TicketsProductListModule,
    MulterModule.register({
      dest: '../upload',
    }),
    FileManagerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
