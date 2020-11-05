import { nanoid } from 'nanoid';
import { TASKS } from '../data/tasks';

export const resolvers = {
    Query: {
        getTask(_parent:any, _args:any, _context:any, _info:any) {
            const { id } = _args.input;
            const result = TASKS.filter(task => task.id === id );
            return result[0]
        },
        getAllTasks(){
            const result = TASKS.filter(task => task.status === true &&  task.deleted === false);
            return result;
        },
        getAll(){
            const result = TASKS.filter(task => task.deleted === false );
            return result;
        },
        getCounts(){
            const result = TASKS.filter(task => task.status === true &&  task.deleted === false).length;
            const result2 = TASKS.filter(task => task.status === false &&  task.deleted === false).length;
            return [TASKS.length, result, result2 ];
        }
    },
    Mutation: {
        async createTask(_parent:any, _args:any, _context:any, _info:any){
            const { title, min, sec, description } = _args.input;
            //----- Create id with nanoid -----//
            const id = nanoid();
            const status = true;
            const time = min+1;
            const deleted = false;
            //----- Save in array new task ----- // 
            TASKS.push({id, title, min, sec, description, status, time, deleted});
            return {id, title, min, sec, description, status, time}
        },
        async deleteTask(_parent:any, _args:any, _context:any, _info:any){
            const { id } = _args.input;
            const result = TASKS.filter(task => task.id === id );
            result[0].deleted = true;
            return result[0]
        },
        async updateTime(_parent:any, _args:any, _context:any, _info:any){
            const { id, min, sec } = _args.input;
            const result = TASKS.filter(task => task.id === id );
            result[0].min = min;
            result[0].sec = sec;
            return result[0]
        },
        async updateStatus(_parent:any, _args:any, _context:any, _info:any){
            const { id } = _args.input;
            const result = TASKS.filter(task => task.id === id );
            result[0].status = false;
            result[0].time = result[0].time - result[0].min;
            return result[0]
        }
    },
}