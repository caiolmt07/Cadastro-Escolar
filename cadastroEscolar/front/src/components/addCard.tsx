import React, { useEffect, useState } from 'react';

type AddCardProps = {
    onCancel: () => void;
    onSave: (formData: FormData) => void;
    initialData?: FormData; 
};


type FormData = {
    nomeCompleto: string;
    dataNascimento: string;
    numeroMatricula: string;
    email: string;
    telefone: string;
    endereco: string;
};

const AddCard: React.FC<AddCardProps> = ({ onCancel, onSave, initialData }) => {
    const [formData, setFormData] = useState<FormData>({
        nomeCompleto: '',
        dataNascimento: '',
        numeroMatricula: '',
        email: '',
        telefone: '',
        endereco: ''
    });

    const [errors, setErrors] = useState<{ [key in keyof FormData]?: string }>({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const validate = () => {
        let validationErrors: { [key in keyof FormData]?: string } = {};

        if (!formData.nomeCompleto.trim()) {
            validationErrors.nomeCompleto = 'Nome completo é obrigatório.';
        }

        if (!formData.dataNascimento) {
            validationErrors.dataNascimento = 'Data de nascimento é obrigatória.';
        }

        if (!formData.numeroMatricula.trim()) {
            validationErrors.numeroMatricula = 'Número de matrícula é obrigatório.';
        }

        if (!formData.email.trim()) {
            validationErrors.email = 'E-mail é obrigatório.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'E-mail inválido.';
        }

        if (!formData.telefone.trim()) {
            validationErrors.telefone = 'Telefone é obrigatório.';
        }

        if (!formData.endereco.trim()) {
            validationErrors.endereco = 'Endereço é obrigatório.';
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSave = () => {
        if (validate()) {
            onSave(formData); 
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="card">
            <span>Nome completo</span>
            <input
                type="text"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleChange}
            />
            {errors.nomeCompleto && <span className="error">{errors.nomeCompleto}</span>}

            <span>Data de nascimento</span>
            <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
            />
            {errors.dataNascimento && <span className="error">{errors.dataNascimento}</span>}

            <span>Número de matrícula</span>
            <input
                type="number"
                name="numeroMatricula"
                value={formData.numeroMatricula}
                onChange={handleChange}
            />
            {errors.numeroMatricula && <span className="error">{errors.numeroMatricula}</span>}

            <span>E-mail</span>
            <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <span>Telefone</span>
            <input
                type="number"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
            />
            {errors.telefone && <span className="error">{errors.telefone}</span>}

            <span>Endereço</span>
            <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
            />
            {errors.endereco && <span className="error">{errors.endereco}</span>}

            <div className="row">
                <button onClick={onCancel}>Cancelar</button>
                <button onClick={handleSave}>Salvar</button>
            </div>
        </div>
    );
};

export default AddCard;
