import { useState } from 'react'
import Input from './Input'
import Select from './Select'

export default function PetForm({handleSubmit, petData, btnText}) {
    
    const [ pet, setPet ] = useState(petData || {})
    const [ preview, setPreview ] = useState([])
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"]

    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setPet({...pet, images: [...e.target.files]})
    }
    function handleChange(e) {
        setPet({...pet, [e.target.name]: e.target.value})
    }
    function handleColor(e) {
        setPet({ ...pet,
            color: e.target.options[e.target.selectedIndex].text,})
    }

    function submit(e) {
        e.preventDefault()
        handleSubmit(pet)
        console.log(pet)
    }
    return (
        <div class="row">
            <form onSubmit={submit} class="col s12">

                <div>
                    {
                        preview.length > 0
                        ? preview.map((image, index) => (
                            <img 
                                class="responsive-img"
                                src={URL.createObjectURL(image)}
                                alt={pet.name}
                                key={`${pet.name}+${index}`}
                            />
                        )) :
                        pet.images && 
                        pet.images.map((image, index) => (
                            <img 
                                class="responsive-img"
                                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                                alt={pet.name}
                                key={`${pet.name}+${index}`}
                            />
                        )) 
                    }
                </div>
                <Input
                    text="Imagens do Pet"
                    type="file"
                    name="images"
                    handleOnChange={onFileChange}
                    multiple={true}
                />
                <Input
                    text="Nome do Pet"
                    type="text"
                    name="name"
                    placeholder="Digite o nome do Pet"
                    handleOnChange={handleChange}
                    value={pet.name || ''}
                />
                <Input
                    text="Idade do Pet"
                    type="text"
                    name="age"
                    placeholder="Digite a idade do Pet"
                    handleOnChange={handleChange}
                    value={pet.age || ''}
                />
                <Input
                    text="Peso do Pet"
                    type="number"
                    name="weight"
                    placeholder="Digite o peso do Pet"
                    handleOnChange={handleChange}
                    value={pet.weight || ''}
                />
                <Select
                    name="color"
                    text="Selecione a cor"
                    options={colors}
                    handleOnChange={handleColor}
                    value={pet.color || ''}
                />
                
                    <input class="btn waves-effect waves-light green darken-1 white-text" type="submit" value={btnText} />
            </form>
        </div>
    );
}