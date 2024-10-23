import { Select } from "antd";

const CustomSelect = ({ setValue, defaultValue }) => {
    const handleChange = (value) => {
        setValue(value);
    };
    return (
        <Select
            defaultValue={defaultValue}
            placeholder="Select Priority"
            style={{
                width: '100%',
            }}
            onChange={handleChange}
            options={[
                {
                    value: 'high',
                    label: 'High',
                },
                {
                    value: 'medium',
                    label: 'Medium',
                },
                {
                    value: 'low',
                    label: 'Low',
                },
            ]}
        />
    )
}

export default CustomSelect