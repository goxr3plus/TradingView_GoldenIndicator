//@version=5
indicator(title='Relative Strength Index', shorttitle='Golden RSI', format=format.price, precision=2, timeframe='')


rsiLength = input.int(14, minval=1, title='Length')
rsiSource = input(close, 'Source')
rsi = ta.rsi(rsiSource, rsiLength)

plot(rsi, 'RSI', color=color.new(color.yellow, 0))


band1 = hline(70, 'Upper Band', color=#C0C0C0)
band0 = hline(30, 'Lower Band', color=#C0C0C0)

fill(band1, band0, color=color.new(color.yellow, 95), title='Background', transp=90)

