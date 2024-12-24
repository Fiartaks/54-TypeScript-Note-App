//Formdan alinan not veriswinin tipi

export type NoteData ={
    title:string;
    markdown:string;
    tags:Tag[];
}

//listelenecek not verisinin ToastPosition

export type Note ={
    id: string;
 }& NoteData;        
 // miras aldik & ile yukardakani

export type Tag ={
    label:string,
    value:string,
}

//type daki butun degerlerin opsiyonel olmasini istiyorsak 
//partial kullanip opsiyonel olmasini istedigimiz tip generic olarak gonderiririz.
//const note : Partial<Tag>={}