interface FormInputProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    error?: string;
  }
  
  const FormInput: React.FC<FormInputProps> = ({ label, type, name, value, onChange, error }) => (
    <>
      <div className="mb-3">
            <label htmlFor="email" className="block text-gray-700 mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
  
  
  export default FormInput;
  