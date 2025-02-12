import * as _trpc_server from '@trpc/server';
import { TaskStatus, Priority } from '@prisma/client';

declare class TaskList {
    readonly id: string;
    name: string;
    description: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: string, name: string, description: string | null, createdAt: Date, updatedAt: Date);
    updateName(name: string): void;
}

interface ITaskListRepository {
    findById(id: string): Promise<any>;
    findAll(): Promise<any>;
    create(taskList: TaskList): Promise<any>;
    update(taskList: TaskList): Promise<any>;
    delete(id: string): Promise<any>;
}

declare class Task {
    readonly id: string;
    title: string;
    description: string | null;
    status: TaskStatus;
    priority: Priority;
    startDate: Date | null;
    dueDate: Date | null;
    completedAt: Date | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly taskListId: string;
    constructor(id: string, title: string, description: string | null, status: TaskStatus, priority: Priority, startDate: Date | null, dueDate: Date | null, completedAt: Date | null, createdAt: Date, updatedAt: Date, taskListId: string);
    updateStatus(status: TaskStatus): void;
    updateDates(startDate: Date | null, dueDate: Date | null): void;
    isOverdue(): boolean;
}

interface TaskFilters {
    status?: TaskStatus;
    priority?: Priority;
    startDate?: Date;
    dueDate?: Date;
}
interface ITaskRepository {
    findById(id: string): Promise<any>;
    findByTaskList(taskListId: string, filters?: TaskFilters): Promise<any>;
    create(task: Task): Promise<any>;
    update(task: Task): Promise<any>;
    delete(id: string): Promise<any>;
}

declare const appRouter: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
    ctx: {
        taskRepository: ITaskRepository;
        taskListRepository: ITaskListRepository;
    };
    meta: object;
    errorShape: _trpc_server.DefaultErrorShape;
    transformer: _trpc_server.DefaultDataTransformer;
}>, {
    task: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            taskRepository: ITaskRepository;
            taskListRepository: ITaskListRepository;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        create: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    taskRepository: ITaskRepository;
                    taskListRepository: ITaskListRepository;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                taskRepository: ITaskRepository;
                taskListRepository: ITaskListRepository;
            };
            _input_in: {
                title: string;
                priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
                taskListId: string;
                description?: string | undefined;
                startDate?: string | undefined;
                dueDate?: string | undefined;
            };
            _input_out: {
                title: string;
                priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
                taskListId: string;
                description?: string | undefined;
                startDate?: string | undefined;
                dueDate?: string | undefined;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
        getById: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    taskRepository: ITaskRepository;
                    taskListRepository: ITaskListRepository;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                taskRepository: ITaskRepository;
                taskListRepository: ITaskListRepository;
            };
            _input_in: string;
            _input_out: string;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
        getByTaskList: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    taskRepository: ITaskRepository;
                    taskListRepository: ITaskListRepository;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                taskRepository: ITaskRepository;
                taskListRepository: ITaskListRepository;
            };
            _input_in: {
                taskListId: string;
                filters?: {
                    status?: "TODO" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED" | undefined;
                    priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
                    startDate?: string | undefined;
                    dueDate?: string | undefined;
                } | undefined;
            };
            _input_out: {
                taskListId: string;
                filters?: {
                    status?: "TODO" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED" | undefined;
                    priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
                    startDate?: string | undefined;
                    dueDate?: string | undefined;
                } | undefined;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
        update: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    taskRepository: ITaskRepository;
                    taskListRepository: ITaskListRepository;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                taskRepository: ITaskRepository;
                taskListRepository: ITaskListRepository;
            };
            _input_in: {
                id: string;
                title?: string | undefined;
                description?: string | undefined;
                status?: "TODO" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED" | undefined;
                priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
                startDate?: string | undefined;
                dueDate?: string | undefined;
            };
            _input_out: {
                id: string;
                title?: string | undefined;
                description?: string | undefined;
                status?: "TODO" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED" | undefined;
                priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
                startDate?: string | undefined;
                dueDate?: string | undefined;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
        delete: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    taskRepository: ITaskRepository;
                    taskListRepository: ITaskListRepository;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                taskRepository: ITaskRepository;
                taskListRepository: ITaskListRepository;
            };
            _input_in: string;
            _input_out: string;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, void>;
    }>;
    taskList: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            taskRepository: ITaskRepository;
            taskListRepository: ITaskListRepository;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        create: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    taskRepository: ITaskRepository;
                    taskListRepository: ITaskListRepository;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                taskRepository: ITaskRepository;
                taskListRepository: ITaskListRepository;
            };
            _input_in: {
                name: string;
                description?: string | undefined;
            };
            _input_out: {
                name: string;
                description?: string | undefined;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
        getAll: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    taskRepository: ITaskRepository;
                    taskListRepository: ITaskListRepository;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {
                taskRepository: ITaskRepository;
                taskListRepository: ITaskListRepository;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, any>;
        getById: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    taskRepository: ITaskRepository;
                    taskListRepository: ITaskListRepository;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                taskRepository: ITaskRepository;
                taskListRepository: ITaskListRepository;
            };
            _input_in: string;
            _input_out: string;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
        update: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    taskRepository: ITaskRepository;
                    taskListRepository: ITaskListRepository;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                taskRepository: ITaskRepository;
                taskListRepository: ITaskListRepository;
            };
            _input_in: {
                id: string;
                name?: string | undefined;
                description?: string | undefined;
            };
            _input_out: {
                id: string;
                name?: string | undefined;
                description?: string | undefined;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
        delete: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    taskRepository: ITaskRepository;
                    taskListRepository: ITaskListRepository;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                taskRepository: ITaskRepository;
                taskListRepository: ITaskListRepository;
            };
            _input_in: string;
            _input_out: string;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, void>;
    }>;
    _debug: _trpc_server.BuildProcedure<"query", {
        _config: _trpc_server.RootConfig<{
            ctx: {
                taskRepository: ITaskRepository;
                taskListRepository: ITaskListRepository;
            };
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>;
        _ctx_out: {
            taskRepository: ITaskRepository;
            taskListRepository: ITaskListRepository;
        };
        _input_in: typeof _trpc_server.unsetMarker;
        _input_out: typeof _trpc_server.unsetMarker;
        _output_in: typeof _trpc_server.unsetMarker;
        _output_out: typeof _trpc_server.unsetMarker;
        _meta: object;
    }, any>;
}>;
type AppRouter = typeof appRouter;

export type { AppRouter };
