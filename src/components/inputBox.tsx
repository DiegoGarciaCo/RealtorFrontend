interface InputBoxProps {
  label: string | React.ReactNode;
  placeholder: string;
  type: string;
  id: string;
  name: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBox({
  label,
  placeholder,
  type,
  id,
  name,
  className,
  onChange,
}: InputBoxProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className={className}
        />
      </div>
    </div>
  );
}
