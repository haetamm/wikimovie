type InputField = {
    name: 'username' | 'password';
    label: string;
    type: string;
};

export const loginFields: InputField[] = [
    {
        name: 'username',
        label: 'Username',
        type: 'text',
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
    },
];