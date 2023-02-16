
export default async function convertToBase64 (file)
{
    return new Promise ((resolve, reject)=>{
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = ()=>{
            return resolve(fileReader.result)
        }

        fileReader.onerror = (error)=>{
            console.log(error);
            return reject(error)
        }
    })
} 