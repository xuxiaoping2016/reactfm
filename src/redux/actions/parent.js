export const NAME = "person/NAME";
export const CHANGE ="person/CHANGE"

export function name() {
  return { type: NAME };
}

export function change(payload){
    return {type: CHANGE,payload}
}
