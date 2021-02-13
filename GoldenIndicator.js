//@version=4
study(shorttitle = "Golden Indicator", title="Tiple Moving Averages",overlay=true)

//-------------------- FUNCTIONS -----------------------------------------------

truncate(number, decimals) =>
    factor = pow(10, decimals)
    int(number * factor) / factor
    
getMA(type,source,period) =>
    if type == "SMA - Simple Moving Average"
        sma(source, period)
    else
        if type == "HMA - Hull Moving Average"
            wma(2*wma(source, period/2)-wma(source, period), round(sqrt(period))) 
        else
            if type == "DMA - Double Exponential Moving Average"
                e = ema(source, period)
                2 * e - ema(e, period)
            else
                if type == "TMA - Triple Exponential Moving Average"
                    e = ema(source, period)
                    3 * (e - ema(e, period)) + ema(ema(e, period), period)
                else
                    if type == "WMA - Weighted Moving Average"
                        wma(source, period)
                    else
                        if type == "RMA - Rolling Moving Average"
                            rma(source, period)
                        else
                            if type == "EMA - Exponential Moving Average"
                                ema(source, period)


//-------------------- INPUTS -----------------------------------------------

AIHelp = input(title="AI HELP EXPERIMENTAL*", type=input.bool, defval=true)
isForexPair = input(title="Forex Pair", type=input.bool, defval=false)

MA1Visible = input(title="------------ MA1 Visible ------------", type=input.bool, defval=true)
MA1Period = input(20, title="MA1 Period")
MA1Type = input(title="MA1 Type", defval="EMA - Exponential Moving Average", options=["SMA - Simple Moving Average", "EMA - Exponential Moving Average","RMA - Rolling Moving Average",  "WMA - Weighted Moving Average", "HMA - Hull Moving Average", "DMA - Double Exponential Moving Average", "TMA - Triple Exponential Moving Average"])
MA1Source = input(title="MA1 Source", type=input.source, defval=close)

MA2Visible = input(title="------------ MA2 Visible ------------", type=input.bool, defval=true)
MA2Period = input(50, title="MA2 Period")
MA2Type = input(title="MA2 Type", defval="EMA - Exponential Moving Average", options=["SMA - Simple Moving Average", "EMA - Exponential Moving Average","RMA - Rolling Moving Average",  "WMA - Weighted Moving Average", "HMA - Hull Moving Average", "DMA - Double Exponential Moving Average", "TMA - Triple Exponential Moving Average"])
MA2Source = input(title="MA2 Source", type=input.source, defval=close)

MA3Visible = input(title="------------ MA3 Visible ------------", type=input.bool, defval=true)
MA3Period = input(150, title="MA3 Period")
MA3Type = input(title="MA3 Type", defval="EMA - Exponential Moving Average", options=["SMA - Simple Moving Average", "EMA - Exponential Moving Average","RMA - Rolling Moving Average",  "WMA - Weighted Moving Average", "HMA - Hull Moving Average", "DMA - Double Exponential Moving Average", "TMA - Triple Exponential Moving Average"])
MA3Source = input(title="MA3 Source", type=input.source, defval=close)

MA1 = getMA(MA1Type,MA1Source,MA1Period)  
MA2 = getMA(MA2Type,MA2Source,MA2Period)
MA3 = getMA(MA3Type,MA3Source,MA3Period)

//Draw the Moving Averages
maColorTransparency = 40
plot(MA1Visible ? MA1 : na,color = color.new(color.green, maColorTransparency),title="EMA1 Plot", linewidth = 4)
plot(MA2Visible ? MA2 : na,color = color.new(color.red, maColorTransparency),title="EMA2 Plot" , linewidth = 4)
plot(MA3Visible ? MA3 : na,color = color.new(color.blue, maColorTransparency),title="EMA3 Plot", linewidth = 4)


//----------------------------- AI HELPER LONG AND SHORT POSITIONS -------------------------------------------------

long  = MA1 > MA2
short = MA1 < MA2

longCondition = not long[5]
shortCondition = not short[5]

// closeLong = MA1 < MA2 and not long[11]
// closeShort = MA1 > MA2 and not short[11]

longPositionVerticalOffset = isForexPair? 0 : 30
shortPositionVerticalOffset = isForexPair? 0 : 15

breakLines= ""
colorTransparency = 0

if(AIHelp)
    if rsi(close,14) >= 60 and short //and MA1 - MA2 < 6  and shortCondition
        lun1 = label.new(bar_index,high + shortPositionVerticalOffset,tostring(truncate(MA1,2))+breakLines,color=color.new(color.red, colorTransparency), textcolor=color.red, size=size.normal , style=label.style_arrowdown)
    if rsi(close,14) <= 30 and long //and MA2 - MA1 < 10 and longCondition
        lup1 = label.new(bar_index,low - longPositionVerticalOffset,  breakLines+""+tostring(truncate(MA1,2)),color=color.new(color.green, colorTransparency), textcolor=color.green, size=size.normal , style=label.style_arrowup)
        
// --------------------------  FORECASTING ------------------------------------------
ShowForecasts = input(title="------------ Show Forecasts ------------", type=input.bool, defval=true)
ForecastBias = input(title="Forecast Bias", defval="Neutral", options=["Neutral", "Bullish", "Bearish"])
ForecastBiasPeriod = input(14, title="Forecast Bias Period")
ForecastBiasMagnitude = input(1, title="Forecast Bias Magnitude", minval=0.25, maxval=20, step=0.25)

// Forecasting - forcasted prices are calculated using our MAType and MASource for the MAPeriod - the last X candles.
//              it essentially replaces the oldest X candles, with the selected source * X candles
// Bias - We'll add an "adjustment" for each additional candle being forecasted based on ATR of the previous X candles
// custom functions in  pine - https://www.tradingview.com/wiki/Declaring_Functions
bias(Bias, BiasPeriod) =>
    if Bias == "Neutral"
        0
    else
        if Bias == "Bullish"
            (atr(BiasPeriod) * ForecastBiasMagnitude)
        else
            if Bias == "Bearish"
                ((atr(BiasPeriod)  * ForecastBiasMagnitude) * -1) // multiplying by -1 to make it a negative, bearish bias
                
Bias = bias(ForecastBias, ForecastBiasPeriod) // 14 is default atr period

getForecast(type,source,period,number) => (getMA(type, source, period - number) * (period - number) + ((source * number) + (Bias * number))) / period

MA1Forecast1 = getForecast(MA1Type, MA1Source, MA1Period, 1)
MA1Forecast2 = getForecast(MA1Type, MA1Source, MA1Period, 2)
MA1Forecast3 = getForecast(MA1Type, MA1Source, MA1Period, 3)
MA1Forecast4 = getForecast(MA1Type, MA1Source, MA1Period, 4)
MA1Forecast5 = getForecast(MA1Type, MA1Source, MA1Period, 5)

plot(MA1Forecast1, color=color.green, linewidth=1, style=plot.style_circles, title="EMA1 Forecast 1", offset=1, show_last=1)
plot(ShowForecasts and MA1Visible ? MA1Forecast2 : na, color=color.green, linewidth=1, style=plot.style_circles, title="EMA1 Forecast 2", offset=2, show_last=1)
plot(ShowForecasts and MA1Visible ? MA1Forecast3 : na, color=color.green, linewidth=1, style=plot.style_circles, title="EMA1 Forecast 3", offset=3, show_last=1)
plot(ShowForecasts and MA1Visible ? MA1Forecast4 : na, color=color.green, linewidth=1, style=plot.style_circles, title="EMA1 Forecast 4", offset=4, show_last=1)
plot(ShowForecasts and MA1Visible ? MA1Forecast5 : na, color=color.green, linewidth=1, style=plot.style_circles, title="EMA1 Forecast 5", offset=5, show_last=1)

MA2Forecast1 = getForecast(MA2Type, MA2Source, MA2Period, 1)
MA2Forecast2 = getForecast(MA2Type, MA2Source, MA2Period, 2)
MA2Forecast3 = getForecast(MA2Type, MA2Source, MA2Period, 3)
MA2Forecast4 = getForecast(MA2Type, MA2Source, MA2Period, 4)
MA2Forecast5 = getForecast(MA2Type, MA2Source, MA2Period, 5)

plot(ShowForecasts and MA2Visible ? MA2Forecast1 : na, color=color.red, linewidth=1, style=plot.style_circles, title="EMA2 Forecast 1", offset=1, show_last=1)
plot(ShowForecasts and MA2Visible ? MA2Forecast2 : na, color=color.red, linewidth=1, style=plot.style_circles, title="EMA2 Forecast 2", offset=2, show_last=1)
plot(ShowForecasts and MA2Visible ? MA2Forecast3 : na, color=color.red, linewidth=1, style=plot.style_circles, title="EMA2 Forecast 3", offset=3, show_last=1)
plot(ShowForecasts and MA2Visible ? MA2Forecast4 : na, color=color.red, linewidth=1, style=plot.style_circles, title="EMA2 Forecast 4", offset=4, show_last=1)
plot(ShowForecasts and MA2Visible ? MA2Forecast5 : na, color=color.red, linewidth=1, style=plot.style_circles, title="EMA2 Forecast 5", offset=5, show_last=1)

MA3Forecast1 = getForecast(MA3Type, MA3Source, MA3Period, 1)
MA3Forecast2 = getForecast(MA3Type, MA3Source, MA3Period, 2)
MA3Forecast3 = getForecast(MA3Type, MA3Source, MA3Period, 3)
MA3Forecast4 = getForecast(MA3Type, MA3Source, MA3Period, 4)
MA3Forecast5 = getForecast(MA3Type, MA3Source, MA3Period, 5)

plot(ShowForecasts and MA3Visible ? MA3Forecast1 : na, color=color.blue, linewidth=1, style=plot.style_circles, title="EMA3 Forecast 1", offset=1, show_last=1)
plot(ShowForecasts and MA3Visible ? MA3Forecast2 : na, color=color.blue, linewidth=1, style=plot.style_circles, title="EMA3 Forecast 2", offset=2, show_last=1)
plot(ShowForecasts and MA3Visible ? MA3Forecast3 : na, color=color.blue, linewidth=1, style=plot.style_circles, title="EMA3 Forecast 2", offset=3, show_last=1)
plot(ShowForecasts and MA3Visible ? MA3Forecast4 : na, color=color.blue, linewidth=1, style=plot.style_circles, title="EMA3 Forecast 4", offset=4, show_last=1)
plot(ShowForecasts and MA3Visible ? MA3Forecast5 : na, color=color.blue, linewidth=1, style=plot.style_circles, title="EMA3 Forecast 5", offset=5, show_last=1)


// result = (getMA(MA1Type, MA1Source, MA1Period - 1) * (MA1Period - 1) + ((MA1Source * 1) + (Bias * 1)))/20
// label.new(bar_index, high + 15, tostring(result))
