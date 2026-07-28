

import { useReducer } from "react";

export type CommandLog = {
  id: number,
  status: 'pending' | 'success' | 'failed',
  command: string,
  output?: string // mensagem a ser exibida
}

type Action =
  | { type: 'ADD_PENDING'; payload: { id: number; command: string } }
  | { type: 'RESOLVE_SUCCESS'; payload: { id: number; output: string } }
  | { type: 'RESOLVE_ERROR'; payload: { id: number; error: string } };

function terminalReducer(state: CommandLog[], action: Action): CommandLog[]{
  switch (action.type) {
    case 'ADD_PENDING':
      return [
        ...state,
        {
          id: action.payload.id,
          command: action.payload.command,
          status: 'pending',
        },
      ];
    case 'RESOLVE_SUCCESS':
      return state.map((log) =>
        log.id === action.payload.id
          ? { ...log, status: 'success', output: action.payload.output }
          : log
      );
    case 'RESOLVE_ERROR':
      return state.map((log) =>
        log.id === action.payload.id
          ? { ...log, status: 'failed', output: action.payload.error }
          : log
      );
    default:
      return state;
  }
}



async function handleCommandExecution(command: string, postID: string): Promise<string> {
  await new Promise((resolver)=> setTimeout(resolver, 2000))
  
  if (command === '/last-post' || command === 'cd last --post'){
      const url = `/blog/${postID}`;
      
      setTimeout(() => {
        window.location.href = url;
      }, 2000);

      return "Último post encontrado..."
    }

    throw new Error("Comando inválido ou erro na execução.")
}

export function useTerminalCommand(){
  const [logs, dispatch] = useReducer(terminalReducer, []);

  const executeCommand = async (rawCommand: string, postID: string) => {
    const cmd = rawCommand.trim()
    if (!cmd) return;
    
    const id = logs.length + 1

    dispatch({type: 'ADD_PENDING', payload: {id, command: cmd}})

    try {
      const output = await handleCommandExecution(cmd, postID);
      dispatch({type: 'RESOLVE_SUCCESS', payload: {id, output}})
    }catch (err) {
      dispatch({type: 'RESOLVE_ERROR', payload: {id, error: `${err}`}})
    }
  }

  return {logs, executeCommand}

}




