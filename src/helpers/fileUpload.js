


export const fileUpload = async ( file ) => {

    if ( !file ) throw new Error('No hay archivo para subir');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dapxymupf/upload?';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal2');
    formData.append('file', file );

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( !resp.ok ) throw new Error('Error al subir el archivo');

        const cloudResp = await resp.json(); //obtengo la respuesta de cloudinary

        return cloudResp.secure_url; //retorno la url segura de cloudinary

       
    } catch (error) {
        throw new Error( error.message );
    }
}