import React, {Component} from 'react';
import './App.css';
import Avatar from "@material-ui/core/Avatar";
import IMG163 from './image/IMG163.jpg';
import IMG164 from './image/IMG164.jpg';
import { LineChart, Line, RadialBar, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis
  } from "recharts";
  

var store_historical_data = [];
const profile = [
	{
	  subject: "IQ",
	  A: 9.5,
	  B: 9,
	},
	{
	  subject: "Math",
	  A: 8.5,
	  B: 6.5,
	},
	{
	  subject: "Analysis",
	  A: 9,
	  B: 7,
	},
	{
	  subject: "Bluffing",
	  A: 6.5,
	  B: 9,
	},
	{
	  subject: "Determination",
	  A: 6.5,
	  B: 9.5,
	},
	{
		subject: "Execution",
		A: 7,
		B: 7,
	  }
  ];

class App extends Component{


	constructor(props) {
		super(props);
		this.state = {
		message$Ray: "$0",
		message$Wen: "$0",
		rebalance$Ray: "$1000",
		rebalance$Wen: "$1000",
		data: []
		}
	}

	update$ray = (e) => {
		let k10 = document.getElementById('RayBetvalue').textContent
		let betvalue = e.currentTarget.innerText.split('$')[1]
		console.log(betvalue)
		let result = Number(k10.split('$')[1]) + Number(betvalue)
		this.setState({ message$Ray: '$' + result})
	};

	showhand$ray = () => {
		let currentBalabcce = document.getElementById('RayBalance').textContent
		this.setState({ message$Ray: currentBalabcce});
	}

	reset$ray = () => {
		this.setState({ message$Ray: '$0'});
	}


	settle$ray = () =>{
		let settlevalue = Number(document.getElementById('WenBetvalue').textContent.split('$')[1])
		let old_raybalance = Number(document.getElementById('RayBalance').textContent.split('$')[1])
		let old_wenbalance = Number(document.getElementById('WenBalance').textContent.split('$')[1])
		let new_raybalance = old_raybalance + settlevalue
		let new_wenbalance = old_wenbalance - settlevalue

		let historical_ray = ['ray'+':'+new_raybalance.toString(), 'wen'+':'+new_wenbalance.toString(), 'ray' + ':' + 'win' + ':'+settlevalue.toString()]
		store_historical_data.push(historical_ray)
		console.log(store_historical_data)

		if (settlevalue !== '$0') {
		this.setState({ rebalance$Ray: '$' + new_raybalance.toString(), rebalance$Wen: '$' + new_wenbalance.toString()});
		}
		else if (settlevalue == '$0'){
		this.setState({ rebalance$Ray: "$1000", rebalance$Wen: "$1000"});
		}
		
	}

	update$Wency = (e) => {
		let k10 = document.getElementById('WenBetvalue').textContent
		let betvalue = e.currentTarget.innerText.split('$')[1]
		let result = Number(k10.split('$')[1]) + Number(betvalue)
		this.setState({ message$Wen: '$' + result})
	};

	showhand$Wency = () => {
		let currentBalabcce = document.getElementById('WenBalance').textContent
		this.setState({ message$Wen: currentBalabcce});
	}

	reset$Wency = () => {
		this.setState({ message$Wen: '$0'});
	}

	settle$wen = () =>{
		let settlevalue = Number(document.getElementById('RayBetvalue').textContent.split('$')[1])
		let old_wenbalance = Number(document.getElementById('WenBalance').textContent.split('$')[1])
		let old_raybalance = Number(document.getElementById('RayBalance').textContent.split('$')[1])
		let new_wenbalance = old_wenbalance + settlevalue
		let new_raybalance = old_raybalance - settlevalue
		let historical_wen = ['ray'+':'+ new_raybalance.toString(), 'wen'+':'+ new_wenbalance.toString(),'wen'+':'+ 'win' + ':'+ settlevalue.toString()]
		store_historical_data.push(historical_wen)
		console.log(store_historical_data)
		console.log(store_historical_data.length)

		if (settlevalue !== '$0') {
		this.setState({ rebalance$Wen: '$' + new_wenbalance.toString(), rebalance$Ray: '$' + new_raybalance.toString()});
		}
		else if (settlevalue == '$0'){
		this.setState({ rebalance$Wen: "$1000", rebalance$Ray: "$1000"});
		}
		
	}
	showdata = () => { 
		var data_dynamic = []
		
		for (let i = 0; i < store_historical_data.length; i++) {
			console.log(i)
			var round_data = {}
			round_data['round'] = i + 1
			round_data['Raymond'] = Number(store_historical_data[i][0].split(':')[1])
			round_data['Wency'] = Number(store_historical_data[i][1].split(':')[1])
			data_dynamic.push(round_data)

		console.log(data_dynamic)

		this.setState({data: data_dynamic})
		}
	}	


  render(){
	  return (

		<div class="flex-container">
		
			<div className="texas"> Poker card (Deck-of-cards) source: https://github.com/deck-of-cards/deck-of-cards</div>
			<div><a className="Deck-of-cards" href="https://deck.of.cards/old/" target="_blank">Start a game</a></div>
			<br/>

			<div className = "profile">
				
					<div className="flex-left">
						<div className = "raymondname">Raymond Jing:</div><br />

							<div className="avatar-radar-child1">
								<div class="avatardiv1">
									<Avatar className="raymondJing" alt="Raymond Jing" src={IMG163} alt={"IMG163"} style={{width: 180, height: 180}} />
								</div>
							</div>
							
							<div className="avatar-radar-child1">
								<div class="rayradar">
									<RadarChart id = "rayradar" className = "rayradarfigure" 
										cx={300}
										cy={165}
										fontSize={18}
										outerRadius={140}
										width={520}
										height={350}
										data={profile}
									>
									<RadialBar
										minAngle={15}
										label={{ position: "insideStart", fill: "#fff" }}
										background
										clockWise
										dataKey="uv"
									/>
									<PolarGrid />
									<PolarAngleAxis dataKey="subject" />
									<PolarRadiusAxis angle={30}/>
									<Radar
										name="Raymond"
										dataKey="A"
										stroke="#000000"
										fill="#3498DB"
										fillOpacity={0.75}
									/>
									</RadarChart>
								</div>
							</div>	
					</div>

	
					<div className="flex-right">
						<div className = "wencyname">Wency Lee:</div><br />


							<div class="avatar-radar-child2" >
								<div class="avatardiv2">
									<Avatar className = "wencyLee" alt="Wency Lee" src={IMG164} alt={"IMG164"} style={{width: 180, height: 180}}/>
								</div>
							</div>

							<div class="avatar-radar-child2">
								<div class="wenradar">
							
									<RadarChart id = "wenradar" className = "wenradarfigure"
										cx={300}
										cy={165}
										fontSize={18}
										outerRadius={140}
										width={520}
										height={350}
										data={profile}
										>
										<PolarGrid />
										<PolarAngleAxis dataKey="subject" />
										<PolarRadiusAxis angle={30}/>
										<Radar
											name="Wency"
											dataKey="B"
											stroke="#000000"
											fill="#00FA9A"
											fillOpacity={0.75}
										/>
									</RadarChart>
								</div>
							</div>	
						
					</div>
				
			</div>
		
			<div className = "betzone">
				<div className="flex-left">
					<div className = "raymondbalance">
						<div>Balance:</div>
						<div id = "RayBalance">{this.state.rebalance$Ray}</div>
					</div>

					<div className="RBet">Place Bet:</div>
						<div id = "RayBetvalue" className="RBetvalue">{this.state.message$Ray}</div><br /><br /><br /><br />
						<button id = "RayBet" className="Rchip" onClick={this.update$ray}>$10</button>&nbsp;&nbsp;&nbsp;
						<button id = "RayBet" className="Rchip" onClick={this.update$ray}>$20</button>&nbsp;&nbsp;&nbsp;
						<button id = "RayBet" className="Rchip" onClick={this.update$ray}>$30</button>&nbsp;&nbsp;&nbsp;<br />
						<button id = "RayBet" className="Rchip" onClick={this.update$ray}>$40</button>&nbsp;&nbsp;&nbsp;
						<button id = "RayBet" className="Rchip" onClick={this.update$ray}>$50</button>&nbsp;&nbsp;&nbsp;
						<button id = "RayBet" className="Rchip" onClick={this.update$ray}>$60</button>&nbsp;&nbsp;&nbsp;<br />
						<button id = "RayBet" className="Rchip" onClick={this.update$ray}>$70</button>&nbsp;&nbsp;&nbsp;
						<button id = "RayBet" className="Rchip" onClick={this.update$ray}>$80</button>&nbsp;&nbsp;&nbsp;
						<button id = "RayBet" className="Rchip" onClick={this.update$ray}>$90</button>&nbsp;&nbsp;&nbsp;<br />
						<button id = "RayBet" className="Rchip" onClick={this.update$ray}>$100</button>&nbsp;&nbsp;&nbsp;
						<button id = "RayBet" className="Rchip" onClick={this.update$ray}>$200</button>&nbsp;&nbsp;&nbsp;
						<button id = "RayBet" className="Rchip" onClick={this.update$ray}>$500</button>&nbsp;&nbsp;&nbsp;<br />
						<button id = "RayBet" className="Rchip" onClick={this.showhand$ray}>ShowHand</button>&nbsp;&nbsp;&nbsp;
						<button id = "RayBet" className="Rchip" onClick={this.reset$ray}>Reset</button>&nbsp;&nbsp;&nbsp;
						<button className="settle" onClick = {this.settle$ray}>settle</button>&nbsp;&nbsp;&nbsp;<br />

					
				</div>
			

				<div className="flex-right">
					<div className = "wencybalance">
						<div>Balance:</div>
						<div id = "WenBalance">{this.state.rebalance$Wen}</div>
					</div>
			
					<div className="WBet">Place Bet:</div>
						<div id = "WenBetvalue" className="WBetvalue">{this.state.message$Wen}</div><br /><br /><br /><br />
						<button id = "WenBet" className="Wchip" onClick={this.update$Wency}>$10</button>&nbsp;&nbsp;&nbsp;
						<button id = "WenBet" className="Wchip" onClick={this.update$Wency}>$20</button>&nbsp;&nbsp;&nbsp;
						<button id = "WenBet" className="Wchip" onClick={this.update$Wency}>$30</button>&nbsp;&nbsp;&nbsp;<br />
						<button id = "WenBet" className="Wchip" onClick={this.update$Wency}>$40</button>&nbsp;&nbsp;&nbsp;
						<button id = "WenBet" className="Wchip" onClick={this.update$Wency}>$50</button>&nbsp;&nbsp;&nbsp;
						<button id = "WenBet" className="Wchip" onClick={this.update$Wency}>$60</button>&nbsp;&nbsp;&nbsp;<br />
						<button id = "WenBet" className="Wchip" onClick={this.update$Wency}>$70</button>&nbsp;&nbsp;&nbsp;
						<button id = "WenBet" className="Wchip" onClick={this.update$Wency}>$80</button>&nbsp;&nbsp;&nbsp;
						<button id = "WenBet" className="Wchip" onClick={this.update$Wency}>$90</button>&nbsp;&nbsp;&nbsp;<br />
						<button id = "WenBet" className="Wchip" onClick={this.update$Wency}>$100</button>&nbsp;&nbsp;&nbsp;
						<button id = "WenBet" className="Wchip" onClick={this.update$Wency}>$200</button>&nbsp;&nbsp;&nbsp;
						<button id = "WenBet" className="Wchip" onClick={this.update$Wency}>$500</button>&nbsp;&nbsp;&nbsp;<br />
						<button id = "WenBet" className="Wchip" onClick={this.showhand$Wency}>ShowHand</button>&nbsp;&nbsp;&nbsp;
						<button id = "WenBet" className="Wchip" onClick={this.reset$Wency}>Reset</button>&nbsp;&nbsp;&nbsp;
						<button className="settle" onClick = {this.settle$wen}>settle</button>&nbsp;&nbsp;&nbsp;<br />
					
				</div>
			</div>
		


			<div className = "gameresult">

				<div>
					<button id = "showhistoricaldata" onClick={this.showdata}>
						Check historical data
					</button>
				</div>

				<div>
					<button id = "savecsv" onClick={this.savecsv}>
						Save historical data
					</button>
				</div>

				<div className = "gameresultsChart">
					<div className = "gameresults">Game results</div>
						<LineChart width={1300} height={550} data={this.state.data} className = "rechartline" style={{backgroundColor: '#282c34'}}
							label = {{enabled: true, fontWeight: 'bold'}}
							marker = {{fill: 'gray', stroke: 'black'}}>
							<CartesianGrid strokeDasharray="5 5" />
							<XAxis dataKey="round" />
							<YAxis fontSize={16} />
							<Tooltip />
							<Legend />
							<Line strokeWidth={4.0} type="monotone" dataKey="Raymond" stroke="#D68910" />
							<Line strokeWidth={4.0} type="monotone" dataKey="Wency" stroke="#ad1457" />
						</LineChart>
				</div>
				
			</div>

		</div>

    	)
	};
}



export default App;

