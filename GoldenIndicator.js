//@version=5
indicator(shorttitle='Golden Indicator', title='Tiple Moving Averages', overlay=true)

//-------------------- FUNCTIONS -----------------------------------------------

truncate(number, decimals) =>
    factor = math.pow(10, decimals)
    int(number * factor) / factor

resolution(timeFrame) =>
    if timeFrame == 'Current'
        timeframe.period
    else
        if timeFrame == '1m'
            '1'
        else
            if timeFrame == '3m'
                '3'
            else
                if timeFrame == '5m'
                    '5'
                else
                    if timeFrame == '15m'
                        '15'
                    else
                        if timeFrame == '30m'
                            '30'
                        else
                            if timeFrame == '45m'
                                '45'
                            else
                                if timeFrame == '1h'
                                    '60'
                                else
                                    if timeFrame == '2h'
                                        '120'
                                    else
                                        if timeFrame == '3h'
                                            '180'
                                        else
                                            if timeFrame == '4h'
                                                '240'
                                            else
                                                if timeFrame == '1D'
                                                    '1D'
                                                else
                                                    if timeFrame == '1W'
                                                        '1W'
                                                    else
                                                        if timeFrame == '1M'
                                                            '1M'

ma(type, source, period) =>
    if type == 'SMA - Simple Moving Average'
        ta.sma(source, period)
    else
        if type == 'HMA - Hull Moving Average'
            ta.wma(2 * ta.wma(source, period / 2) - ta.wma(source, period), math.round(math.sqrt(period)))
        else
            if type == 'DMA - Double Exponential Moving Average'
                e = ta.ema(source, period)
                2 * e - ta.ema(e, period)
            else
                if type == 'TMA - Triple Exponential Moving Average'
                    e = ta.ema(source, period)
                    3 * (e - ta.ema(e, period)) + ta.ema(ta.ema(e, period), period)
                else
                    if type == 'WMA - Weighted Moving Average'
                        ta.wma(source, period)
                    else
                        if type == 'RMA - Rolling Moving Average'
                            ta.rma(source, period)
                        else
                            if type == 'EMA - Exponential Moving Average'
                                ta.ema(source, period)


//-------------------- INPUTS -----------------------------------------------

MA1Visible = input.bool(title='Visible', defval=true, group='Moving Average 1')
MA1Period = input.int(6, title='Period', group='Moving Average 1')
MA1Type = input.string(title='Type', defval='EMA - Exponential Moving Average', options=['SMA - Simple Moving Average', 'EMA - Exponential Moving Average', 'RMA - Rolling Moving Average', 'WMA - Weighted Moving Average', 'HMA - Hull Moving Average', 'DMA - Double Exponential Moving Average', 'TMA - Triple Exponential Moving Average'], group='Moving Average 1')
MA1Source = input.source(title='Source', defval=close, group='Moving Average 1')
MA1TimeFrame = input.string(title='Timeframe', defval='Current', options=['Current', '1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '1D', '1W', '1M'], group='Moving Average 1')

MA2Visible = input.bool(title='Visible', defval=true, group='Moving Average 2')
MA2Period = input.int(21, title='Moving Average 2 Period', group='Moving Average 2')
MA2Type = input.string(title='Type', defval='EMA - Exponential Moving Average', options=['SMA - Simple Moving Average', 'EMA - Exponential Moving Average', 'RMA - Rolling Moving Average', 'WMA - Weighted Moving Average', 'HMA - Hull Moving Average', 'DMA - Double Exponential Moving Average', 'TMA - Triple Exponential Moving Average'], group='Moving Average 2')
MA2Source = input.source(title='Source', defval=close, group='Moving Average 2')
MA2TimeFrame = input.string(title='Timeframe', defval='Current', options=['Current', '1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '1D', '1W', '1M'], group='Moving Average 2')


MA3Visible = input.bool(title='Visible', defval=true, group='Moving Average 3')
MA3Period = input.int(50, title='Period', group='Moving Average 3')
MA3Type = input.string(title='Type', defval='EMA - Exponential Moving Average', options=['SMA - Simple Moving Average', 'EMA - Exponential Moving Average', 'RMA - Rolling Moving Average', 'WMA - Weighted Moving Average', 'HMA - Hull Moving Average', 'DMA - Double Exponential Moving Average', 'TMA - Triple Exponential Moving Average'], group='Moving Average 3')
MA3Source = input.source(title='Source', defval=close, group='Moving Average 3')
MA3TimeFrame = input.string(title='Timeframe', defval='Current', options=['Current', '1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '1D', '1W', '1M'], group='Moving Average 3')

MA4Visible = input.bool(title='Visible', defval=false, group='Moving Average 4')
MA4Period = input.int(150, title='Period', group='Moving Average 4')
MA4Type = input.string(title='Type', defval='EMA - Exponential Moving Average', options=['SMA - Simple Moving Average', 'EMA - Exponential Moving Average', 'RMA - Rolling Moving Average', 'WMA - Weighted Moving Average', 'HMA - Hull Moving Average', 'DMA - Double Exponential Moving Average', 'TMA - Triple Exponential Moving Average'], group='Moving Average 4')
MA4Source = input.source(title='Source', defval=close, group='Moving Average 4')
MA4TimeFrame = input.string(title='Timeframe', defval='Current', options=['Current', '1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '1D', '1W', '1M'], group='Moving Average 4')


MA1 = request.security(syminfo.tickerid, resolution(MA1TimeFrame), ma(MA1Type, MA1Source, MA1Period))
MA2 = request.security(syminfo.tickerid, resolution(MA2TimeFrame), ma(MA2Type, MA2Source, MA2Period))
MA3 = request.security(syminfo.tickerid, resolution(MA3TimeFrame), ma(MA3Type, MA3Source, MA3Period))
MA4 = request.security(syminfo.tickerid, resolution(MA4TimeFrame), ma(MA4Type, MA4Source, MA4Period))


//Draw the Moving Averages
maColorTransparency = 40
plot(MA1Visible ? MA1 : na, color=color.new(color.green, maColorTransparency), title='Moving Average 1 Color', linewidth=3)
plot(MA2Visible ? MA2 : na, color=color.new(color.red, maColorTransparency), title='Moving Average 2 Color', linewidth=3)
plot(MA3Visible ? MA3 : na, color=color.new(color.blue, maColorTransparency), title='Moving Average 3 Color', linewidth=3)
plot(MA4Visible ? MA4 : na, color=color.new(color.purple, maColorTransparency), title='Moving Average 4 Color', linewidth=3)

// --------------------------  FORECASTING ------------------------------------------
ShowForecasts = input.bool(title='Visible', defval=true, group='Forecast')

// RsiInfuenceBias = input(title="Calculate Bias based on RSI", type=input.bool, defval=true)
a = 'Neutral'
// if RsiInfuenceBias == true
//     a = "Bullish"
ForecastBias = input.string(title='Bias', defval=a, options=['Neutral', 'Bullish', 'Bearish'], group='Forecast')


ForecastBiasPeriod = input.int(14, title='Bias Period', group='Forecast')
ForecastBiasMagnitude = input.float(1, title='Bias Magnitude', minval=0.25, maxval=20, step=0.25, group='Forecast')

// Forecasting - forcasted prices are calculated using our MAType and MASource for the MAPeriod - the last X candles.
//              it essentially replaces the oldest X candles, with the selected source * X candles
// Bias - We'll add an "adjustment" for each additional candle being forecasted based on ATR of the previous X candles
// custom functions in  pine - https://www.tradingview.com/wiki/Declaring_Functions
bias(Bias, BiasPeriod) =>
    if Bias == 'Neutral'
        0
    else
        if Bias == 'Bullish'
            ta.atr(BiasPeriod) * ForecastBiasMagnitude
        else
            if Bias == 'Bearish'
                ta.atr(BiasPeriod) * ForecastBiasMagnitude * -1  // multiplying by -1 to make it a negative, bearish bias

Bias = bias(ForecastBias, ForecastBiasPeriod)  // 14 is default atr period

getForecast(type, source, period, number, timeframe) =>
    request.security(syminfo.tickerid, resolution(timeframe), ma(type, source, period - number) * (period - number) + source * number + Bias * number) / period

MA1Forecast1 = getForecast(MA1Type, MA1Source, MA1Period, 1, MA1TimeFrame)
MA1Forecast2 = getForecast(MA1Type, MA1Source, MA1Period, 2, MA1TimeFrame)
MA1Forecast3 = getForecast(MA1Type, MA1Source, MA1Period, 3, MA1TimeFrame)
MA1Forecast4 = getForecast(MA1Type, MA1Source, MA1Period, 4, MA1TimeFrame)
MA1Forecast5 = getForecast(MA1Type, MA1Source, MA1Period, 5, MA1TimeFrame)

plot(MA1TimeFrame == 'Current' and ShowForecasts and MA1Visible ? MA1Forecast1 : na, color=color.new(color.green, 0), linewidth=1, style=plot.style_circles, title='Moving Average 1 Forecast 1', offset=1, show_last=1)
plot(MA1TimeFrame == 'Current' and ShowForecasts and MA1Visible ? MA1Forecast2 : na, color=color.new(color.green, 0), linewidth=1, style=plot.style_circles, title='Moving Average 1 Forecast 2', offset=2, show_last=1)
plot(MA1TimeFrame == 'Current' and ShowForecasts and MA1Visible ? MA1Forecast3 : na, color=color.new(color.green, 0), linewidth=1, style=plot.style_circles, title='Moving Average 1 Forecast 3', offset=3, show_last=1)
plot(MA1TimeFrame == 'Current' and ShowForecasts and MA1Visible ? MA1Forecast4 : na, color=color.new(color.green, 0), linewidth=1, style=plot.style_circles, title='Moving Average 1 Forecast 4', offset=4, show_last=1)
plot(MA1TimeFrame == 'Current' and ShowForecasts and MA1Visible ? MA1Forecast5 : na, color=color.new(color.green, 0), linewidth=1, style=plot.style_circles, title='Moving Average 1 Forecast 5', offset=5, show_last=1)

MA2Forecast1 = getForecast(MA2Type, MA2Source, MA2Period, 1, MA2TimeFrame)
MA2Forecast2 = getForecast(MA2Type, MA2Source, MA2Period, 2, MA2TimeFrame)
MA2Forecast3 = getForecast(MA2Type, MA2Source, MA2Period, 3, MA2TimeFrame)
MA2Forecast4 = getForecast(MA2Type, MA2Source, MA2Period, 4, MA2TimeFrame)
MA2Forecast5 = getForecast(MA2Type, MA2Source, MA2Period, 5, MA2TimeFrame)

plot(MA2TimeFrame == 'Current' and ShowForecasts and MA2Visible ? MA2Forecast1 : na, color=color.new(color.red, 0), linewidth=1, style=plot.style_circles, title='Moving Average 2 Forecast 1', offset=1, show_last=1)
plot(MA2TimeFrame == 'Current' and ShowForecasts and MA2Visible ? MA2Forecast2 : na, color=color.new(color.red, 0), linewidth=1, style=plot.style_circles, title='Moving Average 2 Forecast 2', offset=2, show_last=1)
plot(MA2TimeFrame == 'Current' and ShowForecasts and MA2Visible ? MA2Forecast3 : na, color=color.new(color.red, 0), linewidth=1, style=plot.style_circles, title='Moving Average 2 Forecast 3', offset=3, show_last=1)
plot(MA2TimeFrame == 'Current' and ShowForecasts and MA2Visible ? MA2Forecast4 : na, color=color.new(color.red, 0), linewidth=1, style=plot.style_circles, title='Moving Average 2 Forecast 4', offset=4, show_last=1)
plot(MA2TimeFrame == 'Current' and ShowForecasts and MA2Visible ? MA2Forecast5 : na, color=color.new(color.red, 0), linewidth=1, style=plot.style_circles, title='Moving Average 2 Forecast 5', offset=5, show_last=1)

MA3Forecast1 = getForecast(MA3Type, MA3Source, MA3Period, 1, MA3TimeFrame)
MA3Forecast2 = getForecast(MA3Type, MA3Source, MA3Period, 2, MA3TimeFrame)
MA3Forecast3 = getForecast(MA3Type, MA3Source, MA3Period, 3, MA3TimeFrame)
MA3Forecast4 = getForecast(MA3Type, MA3Source, MA3Period, 4, MA3TimeFrame)
MA3Forecast5 = getForecast(MA3Type, MA3Source, MA3Period, 5, MA3TimeFrame)

plot(MA3TimeFrame == 'Current' and ShowForecasts and MA3Visible ? MA3Forecast1 : na, color=color.new(color.blue, 0), linewidth=1, style=plot.style_circles, title='Moving Average 3 Forecast 1', offset=1, show_last=1)
plot(MA3TimeFrame == 'Current' and ShowForecasts and MA3Visible ? MA3Forecast2 : na, color=color.new(color.blue, 0), linewidth=1, style=plot.style_circles, title='Moving Average 3 Forecast 2', offset=2, show_last=1)
plot(MA3TimeFrame == 'Current' and ShowForecasts and MA3Visible ? MA3Forecast3 : na, color=color.new(color.blue, 0), linewidth=1, style=plot.style_circles, title='Moving Average 3 Forecast 2', offset=3, show_last=1)
plot(MA3TimeFrame == 'Current' and ShowForecasts and MA3Visible ? MA3Forecast4 : na, color=color.new(color.blue, 0), linewidth=1, style=plot.style_circles, title='Moving Average 3 Forecast 4', offset=4, show_last=1)
plot(MA3TimeFrame == 'Current' and ShowForecasts and MA3Visible ? MA3Forecast5 : na, color=color.new(color.blue, 0), linewidth=1, style=plot.style_circles, title='Moving Average 3 Forecast 5', offset=5, show_last=1)

MA4Forecast1 = getForecast(MA4Type, MA4Source, MA4Period, 1, MA4TimeFrame)
MA4Forecast2 = getForecast(MA4Type, MA4Source, MA4Period, 2, MA4TimeFrame)
MA4Forecast3 = getForecast(MA4Type, MA4Source, MA4Period, 3, MA4TimeFrame)
MA4Forecast4 = getForecast(MA4Type, MA4Source, MA4Period, 4, MA4TimeFrame)
MA4Forecast5 = getForecast(MA4Type, MA4Source, MA4Period, 5, MA4TimeFrame)

plot(MA4TimeFrame == 'Current' and ShowForecasts and MA4Visible ? MA4Forecast1 : na, color=color.new(color.purple, 0), linewidth=1, style=plot.style_circles, title='Moving Average 4 Forecast 1', offset=1, show_last=1)
plot(MA4TimeFrame == 'Current' and ShowForecasts and MA4Visible ? MA4Forecast1 : na, color=color.new(color.purple, 0), linewidth=1, style=plot.style_circles, title='Moving Average 4 Forecast 2', offset=2, show_last=1)
plot(MA4TimeFrame == 'Current' and ShowForecasts and MA4Visible ? MA4Forecast1 : na, color=color.new(color.purple, 0), linewidth=1, style=plot.style_circles, title='Moving Average 4 Forecast 2', offset=3, show_last=1)
plot(MA4TimeFrame == 'Current' and ShowForecasts and MA4Visible ? MA4Forecast1 : na, color=color.new(color.purple, 0), linewidth=1, style=plot.style_circles, title='Moving Average 4 Forecast 4', offset=4, show_last=1)
plot(MA4TimeFrame == 'Current' and ShowForecasts and MA4Visible ? MA4Forecast1 : na, color=color.new(color.purple, 0), linewidth=1, style=plot.style_circles, title='Moving Average 4 Forecast 5', offset=5, show_last=1)


//  result = (ma(MA1Type, MA1Source, MA1Period - 1) * (MA1Period - 1) + ((MA1Source * 1) + (Bias * 1)))/20
// label.new(bar_index, high + 15, tostring(5))

// --------------------------  RIBBONS ------------------------------------------
ShowRibbons = input.bool(title='Show Ribbons', defval=false, group='Advanced')

// Ribbon related code
// For Ribbons to work - they must use the same MAType, MAResolution and MASource.  This is to ensure the ribbons are fair between one to the other.
// Ribbons also will usually look better if MA1Period < MA2Period and MA2Period < MA3Period

// custom functions in  pine - https://www.tradingview.com/wiki/Declaring_Functions
// This function is used to calculate the period to be used on a ribbon based on existing MAs
rperiod(P1, P2, Step, Ribbons) =>
    math.abs(P1 - P2) / (Ribbons + 1) * Step + math.min(P1, P2)
    // divide by +1 so that 5 lines can show.  Divide by 5 and one line shows up on another MA

// MA1-MA2
Ribbon1 = request.security(syminfo.tickerid, resolution(MA1TimeFrame), ma(MA1Type, MA1Source, rperiod(MA1Period, MA2Period, 1, 5)))
Ribbon2 = request.security(syminfo.tickerid, resolution(MA1TimeFrame), ma(MA1Type, MA1Source, rperiod(MA1Period, MA2Period, 2, 5)))
Ribbon3 = request.security(syminfo.tickerid, resolution(MA1TimeFrame), ma(MA1Type, MA1Source, rperiod(MA1Period, MA2Period, 3, 5)))
Ribbon4 = request.security(syminfo.tickerid, resolution(MA1TimeFrame), ma(MA1Type, MA1Source, rperiod(MA1Period, MA2Period, 4, 5)))
Ribbon5 = request.security(syminfo.tickerid, resolution(MA1TimeFrame), ma(MA1Type, MA1Source, rperiod(MA1Period, MA2Period, 5, 5)))

plot(MA1Visible and MA2Visible and ShowRibbons and MA1Type == MA2Type and MA1TimeFrame == MA2TimeFrame and MA1Source == MA2Source ? Ribbon1 : na, color=color.new(color.green, 90), linewidth=1, style=plot.style_line, title='Ribbon1')
plot(MA1Visible and MA2Visible and ShowRibbons and MA1Type == MA2Type and MA1TimeFrame == MA2TimeFrame and MA1Source == MA2Source ? Ribbon2 : na, color=color.new(color.green, 85), linewidth=1, style=plot.style_line, title='Ribbon2')
plot(MA1Visible and MA2Visible and ShowRibbons and MA1Type == MA2Type and MA1TimeFrame == MA2TimeFrame and MA1Source == MA2Source ? Ribbon3 : na, color=color.new(color.green, 80), linewidth=1, style=plot.style_line, title='Ribbon3')
plot(MA1Visible and MA2Visible and ShowRibbons and MA1Type == MA2Type and MA1TimeFrame == MA2TimeFrame and MA1Source == MA2Source ? Ribbon4 : na, color=color.new(color.red, 75), linewidth=1, style=plot.style_line, title='Ribbon4')
plot(MA1Visible and MA2Visible and ShowRibbons and MA1Type == MA2Type and MA1TimeFrame == MA2TimeFrame and MA1Source == MA2Source ? Ribbon5 : na, color=color.new(color.red, 70), linewidth=1, style=plot.style_line, title='Ribbon5')

// MA2-MA3
Ribbon6 = request.security(syminfo.tickerid, resolution(MA2TimeFrame), ma(MA2Type, MA2Source, rperiod(MA2Period, MA3Period, 1, 5)))
Ribbon7 = request.security(syminfo.tickerid, resolution(MA2TimeFrame), ma(MA2Type, MA2Source, rperiod(MA2Period, MA3Period, 2, 5)))
Ribbon8 = request.security(syminfo.tickerid, resolution(MA2TimeFrame), ma(MA2Type, MA2Source, rperiod(MA2Period, MA3Period, 3, 5)))
Ribbon9 = request.security(syminfo.tickerid, resolution(MA2TimeFrame), ma(MA2Type, MA2Source, rperiod(MA2Period, MA3Period, 4, 5)))
Ribbon10 = request.security(syminfo.tickerid, resolution(MA2TimeFrame), ma(MA2Type, MA2Source, rperiod(MA2Period, MA3Period, 5, 5)))

plot(MA2Visible and MA3Visible and ShowRibbons and MA2Type == MA3Type and MA2TimeFrame == MA3TimeFrame and MA2Source == MA3Source ? Ribbon6 : na, color=color.new(color.red, 70), linewidth=1, style=plot.style_line, title='Ribbon6')
plot(MA2Visible and MA3Visible and ShowRibbons and MA2Type == MA3Type and MA2TimeFrame == MA3TimeFrame and MA2Source == MA3Source ? Ribbon7 : na, color=color.new(color.red, 75), linewidth=1, style=plot.style_line, title='Ribbon7')
plot(MA2Visible and MA3Visible and ShowRibbons and MA2Type == MA3Type and MA2TimeFrame == MA3TimeFrame and MA2Source == MA3Source ? Ribbon8 : na, color=color.new(color.blue, 80), linewidth=1, style=plot.style_line, title='Ribbon8')
plot(MA2Visible and MA3Visible and ShowRibbons and MA2Type == MA3Type and MA2TimeFrame == MA3TimeFrame and MA2Source == MA3Source ? Ribbon9 : na, color=color.new(color.blue, 85), linewidth=1, style=plot.style_line, title='Ribbon9')
plot(MA2Visible and MA3Visible and ShowRibbons and MA2Type == MA3Type and MA2TimeFrame == MA3TimeFrame and MA2Source == MA3Source ? Ribbon10 : na, color=color.new(color.blue, 90), linewidth=1, style=plot.style_line, title='Ribbon10')

// MA3-MA4
Ribbon11 = request.security(syminfo.tickerid, resolution(MA3TimeFrame), ma(MA3Type, MA3Source, rperiod(MA3Period, MA4Period, 1, 5)))
Ribbon12 = request.security(syminfo.tickerid, resolution(MA3TimeFrame), ma(MA3Type, MA3Source, rperiod(MA3Period, MA4Period, 2, 5)))
Ribbon13 = request.security(syminfo.tickerid, resolution(MA3TimeFrame), ma(MA3Type, MA3Source, rperiod(MA3Period, MA4Period, 3, 5)))
Ribbon14 = request.security(syminfo.tickerid, resolution(MA3TimeFrame), ma(MA3Type, MA3Source, rperiod(MA3Period, MA4Period, 4, 5)))
Ribbon15 = request.security(syminfo.tickerid, resolution(MA3TimeFrame), ma(MA3Type, MA3Source, rperiod(MA3Period, MA4Period, 5, 5)))

plot(MA3Visible and MA4Visible and ShowRibbons and MA3Type == MA4Type and MA3TimeFrame == MA4TimeFrame and MA3Source == MA4Source ? Ribbon11 : na, color=color.new(color.blue, 70), linewidth=1, style=plot.style_line, title='Ribbon11')
plot(MA3Visible and MA4Visible and ShowRibbons and MA3Type == MA4Type and MA3TimeFrame == MA4TimeFrame and MA3Source == MA4Source ? Ribbon12 : na, color=color.new(color.blue, 75), linewidth=1, style=plot.style_line, title='Ribbon12')
plot(MA3Visible and MA4Visible and ShowRibbons and MA3Type == MA4Type and MA3TimeFrame == MA4TimeFrame and MA3Source == MA4Source ? Ribbon13 : na, color=color.new(color.purple, 80), linewidth=1, style=plot.style_line, title='Ribbon13')
plot(MA3Visible and MA4Visible and ShowRibbons and MA3Type == MA4Type and MA3TimeFrame == MA4TimeFrame and MA3Source == MA4Source ? Ribbon14 : na, color=color.new(color.purple, 85), linewidth=1, style=plot.style_line, title='Ribbon14')
plot(MA3Visible and MA4Visible and ShowRibbons and MA3Type == MA4Type and MA3TimeFrame == MA4TimeFrame and MA3Source == MA4Source ? Ribbon15 : na, color=color.new(color.purple, 90), linewidth=1, style=plot.style_line, title='Ribbon15')



//----------------------------- AI HELPER LONG AND SHORT POSITIONS -------------------------------------------------

AIHelp = input.bool(title='AI HELP EXPERIMENTAL*', defval=false, group='Advanced')

long = MA1 > MA2
short = MA1 < MA2

longCondition = not long[5]
shortCondition = not short[5]

// closeLong = MA1 < MA2 and not long[11]
// closeShort = MA1 > MA2 and not short[11]

isSuperPenny = high < 2
biggerThan20000 = high > 20000
longPositionVerticalOffset = low * (isSuperPenny ? 1 : biggerThan20000 ? 18 : 8) / 100
shortPositionVerticalOffset = high * (isSuperPenny ? 1 : biggerThan20000 ? 15 : 5) / 100

breakLines = ''
colorTransparency = 0

if AIHelp
    if ta.rsi(close, 14) >= 60 and short  //and not short[11] //and MA1 - MA2 < 6  and shortCondition
        lun1 = label.new(bar_index, high + shortPositionVerticalOffset, str.tostring(truncate(MA1, isSuperPenny ? 5 : 2)) + breakLines, color=color.new(color.red, colorTransparency), textcolor=color.red, size=size.normal, style=label.style_arrowdown)
        lun1
    if ta.rsi(close, 14) <= 30 and long  //and MA2 - MA1 < 10 and longCondition
        lup1 = label.new(bar_index, low - longPositionVerticalOffset, breakLines + '' + str.tostring(truncate(MA1, isSuperPenny ? 5 : 2)), color=color.new(color.green, colorTransparency), textcolor=color.green, size=size.normal, style=label.style_arrowup)
        lup1


