import { DrugAdministrationForm } from '../DrugAdministrationForm';

export default function DrugAdministrationFormExample() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <DrugAdministrationForm
        onSubmit={(data) => console.log('Treatment submitted:', data)}
        onCancel={() => console.log('Form cancelled')}
      />
    </div>
  );
}