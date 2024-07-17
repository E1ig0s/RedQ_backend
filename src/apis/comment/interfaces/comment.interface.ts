import { CreateCommentDto } from '../dto/create-comment.dto';

export interface ICommentServiceCreate {
    id: string;
    createCommentDto: CreateCommentDto;
}
