import { CreateBoardDto } from '../dto/create-board.dto';

export interface IBoardServiceCreate {
    id: string;
    createBoardDto: CreateBoardDto;
}

export interface IBoardServiceFindByQuery {
    query: string;
}

export interface IBoardsServiceFindOne {
    number: number;
}
