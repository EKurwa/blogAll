import { Article } from './article/entities/article.entity';
import { Label } from './article/entities/label.entity';
import { Permission } from './user/entities/permission.entity';
import { Role } from './user/entities/role.entity';
import { User } from './user/entities/user.entity';
import { File } from './file/entities/file.entity';

export const entities = [User, Role, Permission, File, Article, Label];
