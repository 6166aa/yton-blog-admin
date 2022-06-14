import dbConfig from './db.config';
export default {
  // 端口
  port: parseInt(process.env.PORT, 10) || 3000,
  // 是否开启swagger
  enableSwagger: true,
  // 数据库配置
  dbConfig: {
    ...dbConfig,
    ...{
      synchronize: false,
      autoLoadEntities: true,
      logging: true,
    },
  },
};
