import { SyntheticEvent, useCallback, useState } from "react";
import { CalculatorInputs } from ".";
import {
	Button,
	Card,
	Form,
	ToggleButtonGroup,
	ToggleButton,
} from "react-bootstrap";
import CurrencyInput, {
	onValueChangeProps,
} from "../../components/Form/CurrencyInput";
import TagManager from "react-gtm-module";
interface CalculatorFormProps {
	calcular: (inputs: CalculatorInputs) => void;
}

export function CalculatorForm(props: CalculatorFormProps) {
	const [inputs, setInputs] = useState<CalculatorInputs>({
		aporte_inicial: 0,
		aporte_mensal: 0,
		taxa_mes: 0,
		periodo_em_meses: 0,
		taxa_imposto: 0,
	} as CalculatorInputs);
	const [tipoTaxa, setTipoTaxa] = useState<"anual" | "mensal">("mensal");

	function sendTagManagerEvent() {
		TagManager.initialize({
			gtmId: "G-9N6XEJ9B9M",
			events: {
				renda_calculada: "renda_calculada",
				eventName: "renda_calculada",
			},
			dataLayer: {
				event_name: "calcular",
			},
		});
	}

	const calcular = (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		let taxaMes = inputs.taxa_mes / 100;
		if (tipoTaxa === "anual") {
			taxaMes = taxaMes / 12;
		}
		props.calcular({
			...inputs,
			aporte_inicial: inputs.aporte_inicial / 100,
			aporte_mensal: inputs.aporte_mensal / 100,
			taxa_mes: taxaMes,
			taxa_imposto: inputs.taxa_imposto / 100,
		});

		sendTagManagerEvent();
	};

	const handleChange = (event: any) => {
		const name = event.currentTarget.name;
		const value = event.currentTarget.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleValueChange = useCallback((val: onValueChangeProps) => {
		setInputs((values) => ({ ...values, [val.name]: val.value }));
	}, []);

	return (
		<Card body>
			<Form onSubmit={calcular}>
				<Form.Group className="mb-3">
					<Form.Label column htmlFor="aporte_inicial">
						Valor inicial:
					</Form.Label>
					<CurrencyInput
						name="aporte_inicial"
						max={10000000000000}
						value={inputs.aporte_inicial}
						onValueChange={handleValueChange}
						aria-describedby="aporte_inicial"
					/>
					<Form.Text id="aporte_inicial" muted>
						Você já possui algum valor que irá colocar na primeira vez que for
						fazer o investimento?
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label column>
						Qual a média que você pretende colocar todo mês?
					</Form.Label>
					<CurrencyInput
						name="aporte_mensal"
						max={10000000000000}
						value={inputs.aporte_mensal}
						onValueChange={handleValueChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label column>Qual a taxa de juros?</Form.Label>
					<ToggleButtonGroup
						type="radio"
						name="tipo_taxa"
						value={tipoTaxa}
						onChange={(val: "anual" | "mensal") => setTipoTaxa(val)}
						className="mb-2"
					>
						<ToggleButton
							id="tbg-btn-1"
							value="mensal"
							variant="outline-primary"
						>
							Mensal
						</ToggleButton>
						<ToggleButton
							id="tbg-btn-2"
							value="anual"
							variant="outline-primary"
						>
							Anual
						</ToggleButton>
					</ToggleButtonGroup>
					<CurrencyInput
						max={10000}
						name="taxa_mes"
						display="decimal"
						value={inputs.taxa_mes}
						onValueChange={handleValueChange}
						prefix="% "
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label column>Qual o período em meses?</Form.Label>

					<Form.Control
						type="number"
						id="periodo_em_meses"
						name="periodo_em_meses"
						value={inputs.periodo_em_meses}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label column>
						No final do período, qual o imposto sobre rendimento?
					</Form.Label>

					<CurrencyInput
						max={10000}
						name="taxa_imposto"
						display="decimal"
						value={inputs.taxa_imposto}
						onValueChange={handleValueChange}
						prefix="% "
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Calcular
				</Button>
			</Form>
		</Card>
	);
}
