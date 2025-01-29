import { render, screen } from '@testing-library/react';
import App from '../App';

test('Load App component', () => {
    render(<App/>)
    const element = screen.getByText(/Add Animal/i);
    expect(element).toBeInTheDocument();
})